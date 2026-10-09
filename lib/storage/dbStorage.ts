import fs from 'fs';
import path from 'path';
import { Project } from '@/lib/portfolioService';
import clientPromise from './mongodb';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'projects.json');
const BACKUP_FILE_PATH = path.join(process.cwd(), 'data', 'projects.backup.json');

const DB_NAME = process.env.MONGODB_DB_NAME || 'ssgroup';
const COLLECTION_NAME = 'projects';

/**
 * In-memory cache to ensure that once MongoDB is active,
 * stale local projects.json NEVER resurrects deleted stalls or overwrites new stalls.
 */
let memoryCache: Project[] | null = null;
let isInitializedInMongo = false;

/**
 * Gets MongoDB collection if MONGODB_URI is provided
 */
async function getMongoCollection() {
  if (!clientPromise) return null;
  try {
    const client = await clientPromise;
    return client.db(DB_NAME).collection(COLLECTION_NAME);
  } catch (err) {
    console.warn('MongoDB connection issue:', err);
    return null;
  }
}

/**
 * Reads projects safely from local data/projects.json file
 */
function readFromLocalFile(): Project[] {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      return [];
    }
    const content = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(content) as Project[];
  } catch (error) {
    console.error('Error reading projects.json:', error);
    if (fs.existsSync(BACKUP_FILE_PATH)) {
      try {
        const backupContent = fs.readFileSync(BACKUP_FILE_PATH, 'utf-8');
        return JSON.parse(backupContent) as Project[];
      } catch (backupErr) {
        console.error('Error reading backup file:', backupErr);
      }
    }
    return [];
  }
}

/**
 * Safely saves projects to local file (ignores error in read-only serverless environments)
 */
function saveToLocalFileSafely(projects: Project[]) {
  try {
    const jsonContent = JSON.stringify(projects, null, 2);
    const tempFilePath = `${DATA_FILE_PATH}.tmp`;

    if (fs.existsSync(DATA_FILE_PATH)) {
      try {
        fs.copyFileSync(DATA_FILE_PATH, BACKUP_FILE_PATH);
      } catch {
        // ignore backup copy error
      }
    }

    fs.writeFileSync(tempFilePath, jsonContent, 'utf-8');
    fs.renameSync(tempFilePath, DATA_FILE_PATH);
  } catch {
    // Expected in Vercel serverless read-only environment
  }
}

/**
 * Reads projects.
 * Priority:
 * 1. Live MongoDB Cloud (Single source of truth)
 * 2. In-Memory Cache (if MongoDB has a temporary network hiccup - prevents stale projects.json)
 * 3. Local projects.json (ONLY used if MONGODB_URI is not set at all or on cold start before DB connects)
 */
export async function getStoredProjects(): Promise<Project[]> {
  // If MongoDB URI is configured, MongoDB is the authoritative truth
  const collection = await getMongoCollection();

  if (collection) {
    try {
      const docs = await collection.find({}).toArray();

      if (docs && docs.length > 0) {
        isInitializedInMongo = true;
        const freshProjects = docs.map(({ _id, ...project }) => project as Project);
        memoryCache = freshProjects;
        console.log(`📦 [MongoDB] Loaded ${freshProjects.length} stalls from Cloud Database.`);
        return freshProjects;
      }

      // If database collection is brand new and empty, seed it once with initial stalls
      if (!isInitializedInMongo) {
        const localProjects = readFromLocalFile();
        if (localProjects.length > 0) {
          await collection.insertMany(localProjects.map((p) => ({ ...p })));
          isInitializedInMongo = true;
          memoryCache = localProjects;
          console.log(`🌱 [MongoDB] Auto-seeded ${localProjects.length} initial stalls into empty Cloud Database.`);
          return localProjects;
        }
      }

      // If admin intentionally deleted all stalls from MongoDB, return empty list (do not resurrect!)
      memoryCache = [];
      return [];
    } catch (err: any) {
      console.warn(`⚠️ [MongoDB] Disconnected or query failed: ${err?.message || err}. Serving from In-Memory/Local fallback.`);
      // If we already had data loaded from MongoDB, return the memory cache!
      // This prevents the old local projects.json from resurrecting deleted stalls!
      if (memoryCache !== null) {
        return memoryCache;
      }
    }
  }

  // If memory cache exists from earlier, serve it
  if (memoryCache !== null) {
    return memoryCache;
  }

  // Fallback for offline dev or cold start without MONGODB_URI
  const local = readFromLocalFile();
  memoryCache = local;
  return local;
}

/**
 * Saves projects array
 */
export async function saveStoredProjects(projects: Project[]): Promise<void> {
  memoryCache = projects;
  isInitializedInMongo = true;

  const collection = await getMongoCollection();
  if (collection) {
    try {
      await collection.deleteMany({});
      if (projects.length > 0) {
        await collection.insertMany(projects.map((p) => ({ ...p })));
      }
      saveToLocalFileSafely(projects);
      return;
    } catch (err) {
      console.error('Error saving projects to MongoDB:', err);
    }
  }

  saveToLocalFileSafely(projects);
}

/**
 * Upsert (insert or update) a project
 */
export async function upsertProject(project: Project): Promise<Project> {
  // Update memory cache immediately
  if (memoryCache) {
    const idx = memoryCache.findIndex((p) => p.id === project.id);
    if (idx >= 0) {
      memoryCache[idx] = { ...memoryCache[idx], ...project };
    } else {
      memoryCache.unshift(project);
    }
  }

  const collection = await getMongoCollection();
  if (collection) {
    try {
      await collection.updateOne(
        { id: project.id },
        { $set: project },
        { upsert: true }
      );
      saveToLocalFileSafely(memoryCache || [project]);
      console.log(`💾 [MongoDB] Successfully saved stall to Cloud Database: "${project.title}" (ID: ${project.id})`);
      return project;
    } catch (err: any) {
      console.error(`🔴 [MongoDB] Error upserting project in MongoDB:`, err?.message || err);
    }
  }

  // Local fallback
  const projects = readFromLocalFile();
  const index = projects.findIndex((p) => p.id === project.id);
  if (index >= 0) {
    projects[index] = { ...projects[index], ...project };
  } else {
    projects.unshift(project);
  }
  memoryCache = projects;
  saveToLocalFileSafely(projects);
  console.log(`💾 [Local] Saved stall to local fallback: "${project.title}"`);
  return project;
}

/**
 * Delete a project by id
 */
export async function deleteProjectById(id: string): Promise<boolean> {
  // Remove from memory cache immediately so it never shows up again
  if (memoryCache) {
    memoryCache = memoryCache.filter((p) => p.id !== id);
  }

  const collection = await getMongoCollection();
  if (collection) {
    try {
      const res = await collection.deleteOne({ id });
      saveToLocalFileSafely(memoryCache || []);
      console.log(`🗑️ [MongoDB] Successfully deleted stall from Cloud Database (ID: ${id})`);
      return res.deletedCount > 0;
    } catch (err: any) {
      console.error(`🔴 [MongoDB] Error deleting project in MongoDB:`, err?.message || err);
    }
  }

  // Local fallback
  const projects = readFromLocalFile();
  const filtered = projects.filter((p) => p.id !== id);
  if (filtered.length === projects.length) {
    return false;
  }
  memoryCache = filtered;
  saveToLocalFileSafely(filtered);
  return true;
}

/**
 * Toggle featured flag
 */
export async function toggleProjectFeatured(id: string): Promise<boolean> {
  let updatedFeatured = false;
  if (memoryCache) {
    const p = memoryCache.find((item) => item.id === id);
    if (p) {
      p.featured = !p.featured;
      updatedFeatured = p.featured;
    }
  }

  const collection = await getMongoCollection();
  if (collection) {
    try {
      const doc = await collection.findOne({ id });
      if (!doc) return false;
      const newFeatured = !doc.featured;
      await collection.updateOne({ id }, { $set: { featured: newFeatured } });
      saveToLocalFileSafely(memoryCache || []);
      return newFeatured;
    } catch (err) {
      console.error('Error toggling featured in MongoDB:', err);
    }
  }

  // Local fallback
  const projects = readFromLocalFile();
  const project = projects.find((p) => p.id === id);
  if (!project) return false;
  project.featured = !project.featured;
  saveToLocalFileSafely(projects);
  return project.featured;
}

/**
 * Clone an existing project with clean suffix
 */
export async function cloneProject(id: string): Promise<Project | null> {
  const timestamp = Date.now().toString().slice(-4);

  const collection = await getMongoCollection();
  if (collection) {
    try {
      const doc = await collection.findOne({ id });
      if (!doc) return null;
      const { _id, ...original } = doc;
      const cloned: Project = {
        ...(original as Project),
        id: `${original.id}-copy-${timestamp}`,
        slug: `${original.slug}-copy-${timestamp}`,
        title: `${original.title} (Copy)`,
        featured: false,
        status: 'draft',
      };
      await collection.insertOne(cloned);
      if (memoryCache) {
        memoryCache.unshift(cloned);
      }
      saveToLocalFileSafely(memoryCache || [cloned]);
      return cloned;
    } catch (err) {
      console.error('Error cloning project in MongoDB:', err);
    }
  }

  // Local fallback
  const projects = readFromLocalFile();
  const original = projects.find((p) => p.id === id);
  if (!original) return null;

  const cloned: Project = {
    ...original,
    id: `${original.id}-copy-${timestamp}`,
    slug: `${original.slug}-copy-${timestamp}`,
    title: `${original.title} (Copy)`,
    featured: false,
    status: 'draft',
  };

  projects.unshift(cloned);
  memoryCache = projects;
  saveToLocalFileSafely(projects);
  return cloned;
}
