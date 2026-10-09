import fs from 'fs';
import path from 'path';
import { HeroSlide, DEFAULT_HERO_SLIDES } from '@/lib/heroService';
import clientPromise from './mongodb';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'heroSlides.json');
const BACKUP_FILE_PATH = path.join(process.cwd(), 'data', 'heroSlides.backup.json');

const DB_NAME = process.env.MONGODB_DB_NAME || 'ssgroup';
const COLLECTION_NAME = 'hero_slides';

let memoryCache: HeroSlide[] | null = null;
let isInitializedInMongo = false;

async function getMongoCollection() {
  if (!clientPromise) return null;
  try {
    const client = await clientPromise;
    return client.db(DB_NAME).collection(COLLECTION_NAME);
  } catch (err) {
    console.warn('MongoDB connection issue for hero slides:', err);
    return null;
  }
}

function readFromLocalFile(): HeroSlide[] {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      return DEFAULT_HERO_SLIDES;
    }
    const content = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(content) as HeroSlide[];
  } catch (error) {
    console.error('Error reading heroSlides.json:', error);
    if (fs.existsSync(BACKUP_FILE_PATH)) {
      try {
        const backupContent = fs.readFileSync(BACKUP_FILE_PATH, 'utf-8');
        return JSON.parse(backupContent) as HeroSlide[];
      } catch {
        // fallback to defaults
      }
    }
    return DEFAULT_HERO_SLIDES;
  }
}

function saveToLocalFileSafely(slides: HeroSlide[]) {
  try {
    const jsonContent = JSON.stringify(slides, null, 2);
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
 * Reads hero slides sorted by order ascending.
 */
export async function getStoredHeroSlides(): Promise<HeroSlide[]> {
  const collection = await getMongoCollection();

  if (collection) {
    try {
      const docs = await collection.find({}).sort({ order: 1 }).toArray();

      if (docs && docs.length > 0) {
        isInitializedInMongo = true;
        const freshSlides = docs.map(({ _id, ...slide }) => slide as HeroSlide);
        memoryCache = freshSlides;
        return freshSlides;
      }

      // If database collection is brand new and empty, seed it once with default hero slides
      if (!isInitializedInMongo) {
        const localSlides = readFromLocalFile();
        if (localSlides.length > 0) {
          await collection.insertMany(localSlides.map((s) => ({ ...s })));
          isInitializedInMongo = true;
          memoryCache = localSlides;
          console.log(`🌱 [MongoDB] Auto-seeded ${localSlides.length} initial hero slides into Cloud Database.`);
          return localSlides;
        }
      }

      memoryCache = [];
      return [];
    } catch (err: any) {
      console.warn(`⚠️ [MongoDB] Error fetching hero slides: ${err?.message || err}. Serving from cache/fallback.`);
      if (memoryCache !== null) {
        return memoryCache;
      }
    }
  }

  if (memoryCache !== null) {
    return memoryCache;
  }

  const local = readFromLocalFile();
  memoryCache = local;
  return local;
}

/**
 * Upsert a single hero slide
 */
export async function upsertHeroSlide(slide: HeroSlide): Promise<HeroSlide> {
  if (memoryCache) {
    const idx = memoryCache.findIndex((s) => s.id === slide.id);
    if (idx >= 0) {
      memoryCache[idx] = { ...memoryCache[idx], ...slide };
    } else {
      memoryCache.push(slide);
    }
    memoryCache.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }

  const collection = await getMongoCollection();
  if (collection) {
    try {
      await collection.updateOne(
        { id: slide.id },
        { $set: slide },
        { upsert: true }
      );
      saveToLocalFileSafely(memoryCache || [slide]);
      console.log(`💾 [MongoDB] Successfully saved Hero Slide: "${slide.title}"`);
      return slide;
    } catch (err: any) {
      console.error('Error upserting hero slide in MongoDB:', err?.message || err);
    }
  }

  const slides = readFromLocalFile();
  const index = slides.findIndex((s) => s.id === slide.id);
  if (index >= 0) {
    slides[index] = { ...slides[index], ...slide };
  } else {
    slides.push(slide);
  }
  slides.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  memoryCache = slides;
  saveToLocalFileSafely(slides);
  return slide;
}

/**
 * Delete a hero slide by id
 */
export async function deleteHeroSlide(id: string): Promise<boolean> {
  if (memoryCache) {
    memoryCache = memoryCache.filter((s) => s.id !== id);
  }

  const collection = await getMongoCollection();
  if (collection) {
    try {
      const res = await collection.deleteOne({ id });
      saveToLocalFileSafely(memoryCache || []);
      console.log(`🗑️ [MongoDB] Deleted hero slide: ${id}`);
      return res.deletedCount > 0;
    } catch (err: any) {
      console.error('Error deleting hero slide in MongoDB:', err?.message || err);
    }
  }

  const slides = readFromLocalFile();
  const filtered = slides.filter((s) => s.id !== id);
  if (filtered.length === slides.length) return false;
  memoryCache = filtered;
  saveToLocalFileSafely(filtered);
  return true;
}

/**
 * Toggle hero slide active status
 */
export async function toggleHeroSlideActive(id: string): Promise<boolean> {
  let newActive = true;
  if (memoryCache) {
    const s = memoryCache.find((item) => item.id === id);
    if (s) {
      s.active = !s.active;
      newActive = s.active;
    }
  }

  const collection = await getMongoCollection();
  if (collection) {
    try {
      const doc = await collection.findOne({ id });
      if (!doc) return false;
      newActive = !doc.active;
      await collection.updateOne({ id }, { $set: { active: newActive } });
      saveToLocalFileSafely(memoryCache || []);
      return newActive;
    } catch (err: any) {
      console.error('Error toggling hero slide active in MongoDB:', err?.message || err);
    }
  }

  const slides = readFromLocalFile();
  const slide = slides.find((s) => s.id === id);
  if (!slide) return false;
  slide.active = !slide.active;
  saveToLocalFileSafely(slides);
  return slide.active;
}

/**
 * Reorder slides by array of IDs
 */
export async function reorderHeroSlides(orderedIds: string[]): Promise<HeroSlide[]> {
  const allSlides = await getStoredHeroSlides();
  const reordered: HeroSlide[] = [];

  orderedIds.forEach((id, index) => {
    const slide = allSlides.find((s) => s.id === id);
    if (slide) {
      reordered.push({ ...slide, order: index });
    }
  });

  // Add any slides not included in orderedIds to the end
  allSlides.forEach((s) => {
    if (!orderedIds.includes(s.id)) {
      reordered.push({ ...s, order: reordered.length });
    }
  });

  memoryCache = reordered;

  const collection = await getMongoCollection();
  if (collection) {
    try {
      await collection.deleteMany({});
      if (reordered.length > 0) {
        await collection.insertMany(reordered.map((s) => ({ ...s })));
      }
      saveToLocalFileSafely(reordered);
      return reordered;
    } catch (err: any) {
      console.error('Error saving reordered slides to MongoDB:', err?.message || err);
    }
  }

  saveToLocalFileSafely(reordered);
  return reordered;
}
