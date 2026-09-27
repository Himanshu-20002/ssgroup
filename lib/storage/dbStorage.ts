import fs from 'fs';
import path from 'path';
import { Project } from '@/lib/portfolioService';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'projects.json');
const BACKUP_FILE_PATH = path.join(process.cwd(), 'data', 'projects.backup.json');

/**
 * Reads projects safely from data/projects.json
 */
export async function getStoredProjects(): Promise<Project[]> {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      return [];
    }
    const content = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(content) as Project[];
  } catch (error) {
    console.error('Error reading projects.json:', error);
    // If main file is corrupted, try fallback to backup
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
 * Saves projects array with atomic rename and rolling backup
 */
export async function saveStoredProjects(projects: Project[]): Promise<void> {
  const jsonContent = JSON.stringify(projects, null, 2);
  const tempFilePath = `${DATA_FILE_PATH}.tmp`;

  // 1. Create a backup of existing file if it exists
  if (fs.existsSync(DATA_FILE_PATH)) {
    try {
      fs.copyFileSync(DATA_FILE_PATH, BACKUP_FILE_PATH);
    } catch (err) {
      console.warn('Could not create backup:', err);
    }
  }

  // 2. Write to temp file first (atomic write pattern)
  fs.writeFileSync(tempFilePath, jsonContent, 'utf-8');

  // 3. Atomically rename temp file to target
  fs.renameSync(tempFilePath, DATA_FILE_PATH);
}

/**
 * Upsert (insert or update) a project
 */
export async function upsertProject(project: Project): Promise<Project> {
  const projects = await getStoredProjects();
  const index = projects.findIndex((p) => p.id === project.id);

  if (index >= 0) {
    // Update existing
    projects[index] = { ...projects[index], ...project };
  } else {
    // Insert new at the beginning
    projects.unshift(project);
  }

  await saveStoredProjects(projects);
  return project;
}

/**
 * Delete a project by id
 */
export async function deleteProjectById(id: string): Promise<boolean> {
  const projects = await getStoredProjects();
  const filtered = projects.filter((p) => p.id !== id);

  if (filtered.length === projects.length) {
    return false; // nothing was deleted
  }

  await saveStoredProjects(filtered);
  return true;
}

/**
 * Toggle featured flag
 */
export async function toggleProjectFeatured(id: string): Promise<boolean> {
  const projects = await getStoredProjects();
  const project = projects.find((p) => p.id === id);
  if (!project) return false;

  project.featured = !project.featured;
  await saveStoredProjects(projects);
  return project.featured;
}

/**
 * Clone an existing project with clean suffix
 */
export async function cloneProject(id: string): Promise<Project | null> {
  const projects = await getStoredProjects();
  const original = projects.find((p) => p.id === id);
  if (!original) return null;

  const timestamp = Date.now().toString().slice(-4);
  const cloned: Project = {
    ...original,
    id: `${original.id}-copy-${timestamp}`,
    slug: `${original.slug}-copy-${timestamp}`,
    title: `${original.title} (Copy)`,
    featured: false,
    status: 'draft',
  };

  projects.unshift(cloned);
  await saveStoredProjects(projects);
  return cloned;
}
