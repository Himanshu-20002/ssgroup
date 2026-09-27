'use server';

import { revalidatePath } from 'next/cache';
import { Project } from '@/lib/portfolioService';
import { isAuthenticated } from '@/lib/adminAuth';
import {
  upsertProject,
  deleteProjectById,
  toggleProjectFeatured,
  cloneProject,
} from '@/lib/storage/dbStorage';

/**
 * Save or update project
 */
export async function saveProjectAction(project: Project) {
  const authed = await isAuthenticated();
  if (!authed) throw new Error('Unauthorized');

  // Ensure default status
  if (!project.status) {
    project.status = 'published';
  }

  // Ensure id and slug exist
  if (!project.id) {
    const timestamp = Date.now().toString().slice(-6);
    project.id = `stall-${project.slug || timestamp}`;
  }

  await upsertProject(project);

  // Trigger cache revalidation so public page updates immediately
  revalidatePath('/portfolio');
  revalidatePath('/admin');
  revalidatePath('/');

  return { success: true, project };
}

/**
 * Delete project
 */
export async function deleteProjectAction(id: string) {
  const authed = await isAuthenticated();
  if (!authed) throw new Error('Unauthorized');

  const success = await deleteProjectById(id);

  revalidatePath('/portfolio');
  revalidatePath('/admin');
  revalidatePath('/');

  return { success };
}

/**
 * Toggle featured
 */
export async function toggleFeaturedAction(id: string) {
  const authed = await isAuthenticated();
  if (!authed) throw new Error('Unauthorized');

  const featured = await toggleProjectFeatured(id);

  revalidatePath('/portfolio');
  revalidatePath('/admin');

  return { success: true, featured };
}

/**
 * Clone project
 */
export async function cloneProjectAction(id: string) {
  const authed = await isAuthenticated();
  if (!authed) throw new Error('Unauthorized');

  const cloned = await cloneProject(id);

  revalidatePath('/admin');

  return { success: true, cloned };
}
