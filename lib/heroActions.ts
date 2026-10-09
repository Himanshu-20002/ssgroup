'use server';

import { revalidatePath } from 'next/cache';
import { HeroSlide } from '@/lib/heroService';
import { isAuthenticated } from '@/lib/adminAuth';
import {
  upsertHeroSlide,
  deleteHeroSlide,
  toggleHeroSlideActive,
  reorderHeroSlides,
} from '@/lib/storage/heroStorage';

/**
 * Save or update a hero slide
 */
export async function saveHeroSlideAction(slide: HeroSlide) {
  const authed = await isAuthenticated();
  if (!authed) throw new Error('Unauthorized');

  if (!slide.id) {
    const timestamp = Date.now().toString().slice(-6);
    slide.id = `slide-${timestamp}`;
  }

  const saved = await upsertHeroSlide(slide);

  revalidatePath('/');
  revalidatePath('/admin');

  return { success: true, slide: saved };
}

/**
 * Delete a hero slide
 */
export async function deleteHeroSlideAction(id: string) {
  const authed = await isAuthenticated();
  if (!authed) throw new Error('Unauthorized');

  const success = await deleteHeroSlide(id);

  revalidatePath('/');
  revalidatePath('/admin');

  return { success };
}

/**
 * Toggle hero slide active status (show/hide on homepage)
 */
export async function toggleHeroSlideActiveAction(id: string) {
  const authed = await isAuthenticated();
  if (!authed) throw new Error('Unauthorized');

  const active = await toggleHeroSlideActive(id);

  revalidatePath('/');
  revalidatePath('/admin');

  return { success: true, active };
}

/**
 * Reorder hero slides
 */
export async function reorderHeroSlidesAction(orderedIds: string[]) {
  const authed = await isAuthenticated();
  if (!authed) throw new Error('Unauthorized');

  const reordered = await reorderHeroSlides(orderedIds);

  revalidatePath('/');
  revalidatePath('/admin');

  return { success: true, slides: reordered };
}
