import fs from 'fs';
import path from 'path';
import { Project } from '@/lib/portfolioService';
import clientPromise from './mongodb';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'projects.json');
const BACKUP_FILE_PATH = path.join(process.cwd(), 'data', 'projects.backup.json');

const DB_NAME = process.env.MONGODB_DB_NAME || 'ssgroup';
const COLLECTION_NAME = 'projects';

const globalForProjects = globalThis as unknown as {
  _dbProjectsCache?: Project[] | null;
  _dbProjectsLastFetch?: number;
  _dbProjectsInFlight?: Promise<Project[]> | null;
  _isInitializedInMongo?: boolean;
};

const CACHE_TTL_MS = 60 * 1000;

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
  const now = Date.now();
  const cache = globalForProjects._dbProjectsCache;
  const lastFetch = globalForProjects._dbProjectsLastFetch || 0;

  // 1. Instant response from memory cache if within TTL
  if (cache !== null && cache !== undefined && (now - lastFetch < CACHE_TTL_MS)) {
    return cache;
  }

  // 2. Coalesce concurrent calls to a single MongoDB request
  if (globalForProjects._dbProjectsInFlight) {
    return globalForProjects._dbProjectsInFlight;
  }

  globalForProjects._dbProjectsInFlight = (async () => {
    try {
      const collection = await getMongoCollection();

      if (collection) {
        const docs = await collection.find({}).toArray();

        if (docs && docs.length > 0) {
          globalForProjects._isInitializedInMongo = true;
          const freshProjects = docs.map(({ _id, ...project }) => project as Project);
          globalForProjects._dbProjectsCache = freshProjects;
          globalForProjects._dbProjectsLastFetch = Date.now();
          console.log(`📦 [MongoDB] Loaded ${freshProjects.length} stalls from Cloud Database.`);
          return freshProjects;
        }

        if (!globalForProjects._isInitializedInMongo) {
          const localProjects = readFromLocalFile();
          if (localProjects.length > 0) {
            await collection.insertMany(localProjects.map((p) => ({ ...p })));
            globalForProjects._isInitializedInMongo = true;
            globalForProjects._dbProjectsCache = localProjects;
            globalForProjects._dbProjectsLastFetch = Date.now();
            console.log(`🌱 [MongoDB] Auto-seeded ${localProjects.length} initial stalls.`);
            return localProjects;
          }
        }

        globalForProjects._dbProjectsCache = [];
        globalForProjects._dbProjectsLastFetch = Date.now();
        return [];
      }
    } catch (err: any) {
      console.warn(`⚠️ [MongoDB] Disconnected or query failed: ${err?.message || err}. Serving from In-Memory/Local fallback.`);
      if (globalForProjects._dbProjectsCache) {
        return globalForProjects._dbProjectsCache;
      }
    } finally {
      globalForProjects._dbProjectsInFlight = null;
    }

    if (globalForProjects._dbProjectsCache) {
      return globalForProjects._dbProjectsCache;
    }

    const local = readFromLocalFile();
    globalForProjects._dbProjectsCache = local;
    globalForProjects._dbProjectsLastFetch = Date.now();
    return local;
  })();

  return globalForProjects._dbProjectsInFlight;
}

/**
 * Saves projects array
 */
export async function saveStoredProjects(projects: Project[]): Promise<void> {
  globalForProjects._dbProjectsCache = projects;
  globalForProjects._dbProjectsLastFetch = Date.now();
  globalForProjects._isInitializedInMongo = true;

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
  globalForProjects._dbProjectsLastFetch = Date.now();
  // Update memory cache immediately
  if (globalForProjects._dbProjectsCache) {
    const idx = globalForProjects._dbProjectsCache.findIndex((p) => p.id === project.id);
    if (idx >= 0) {
      globalForProjects._dbProjectsCache[idx] = { ...globalForProjects._dbProjectsCache[idx], ...project };
    } else {
      globalForProjects._dbProjectsCache.unshift(project);
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
      saveToLocalFileSafely(globalForProjects._dbProjectsCache || [project]);
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
  globalForProjects._dbProjectsCache = projects;
  saveToLocalFileSafely(projects);
  console.log(`💾 [Local] Saved stall to local fallback: "${project.title}"`);
  return project;
}

/**
 * Delete a project by id
 */
export async function deleteProjectById(id: string): Promise<boolean> {
  globalForProjects._dbProjectsLastFetch = Date.now();
  // Remove from memory cache immediately so it never shows up again
  if (globalForProjects._dbProjectsCache) {
    globalForProjects._dbProjectsCache = globalForProjects._dbProjectsCache.filter((p) => p.id !== id);
  }

  const collection = await getMongoCollection();
  if (collection) {
    try {
      const res = await collection.deleteOne({ id });
      saveToLocalFileSafely(globalForProjects._dbProjectsCache || []);
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
  globalForProjects._dbProjectsCache = filtered;
  saveToLocalFileSafely(filtered);
  return true;
}

/**
 * Toggle featured flag
 */
export async function toggleProjectFeatured(id: string): Promise<boolean> {
  globalForProjects._dbProjectsLastFetch = Date.now();
  let updatedFeatured = false;
  if (globalForProjects._dbProjectsCache) {
    const p = globalForProjects._dbProjectsCache.find((item) => item.id === id);
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
      saveToLocalFileSafely(globalForProjects._dbProjectsCache || []);
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
      if (globalForProjects._dbProjectsCache) {
        globalForProjects._dbProjectsCache.unshift(cloned);
      }
      saveToLocalFileSafely(globalForProjects._dbProjectsCache || [cloned]);
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
  globalForProjects._dbProjectsCache = projects;
  saveToLocalFileSafely(projects);
  return cloned;
}
