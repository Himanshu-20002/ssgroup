'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { HeroSlide } from '@/lib/heroService';
import { HeroSlideDrawer } from './HeroSlideDrawer';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import {
  deleteHeroSlideAction,
  toggleHeroSlideActiveAction,
  reorderHeroSlidesAction,
} from '@/lib/heroActions';
import {
  Plus,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Sparkles,
  Layers,
  CheckCircle2,
  Sliders,
  ExternalLink,
} from 'lucide-react';

interface HeroSlideListProps {
  initialSlides: HeroSlide[];
}

export function HeroSlideList({ initialSlides }: HeroSlideListProps) {
  const [slides, setSlides] = useState<HeroSlide[]>(initialSlides);
  const [activeSlide, setActiveSlide] = useState<HeroSlide | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [slideToDelete, setSlideToDelete] = useState<HeroSlide | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleAddNew = () => {
    setActiveSlide(null);
    setIsDrawerOpen(true);
  };

  const handleEdit = (slide: HeroSlide) => {
    setActiveSlide(slide);
    setIsDrawerOpen(true);
  };

  const handleSaved = (savedSlide: HeroSlide) => {
    setSlides((prev) => {
      const idx = prev.findIndex((s) => s.id === savedSlide.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = savedSlide;
        return copy.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      } else {
        return [...prev, savedSlide].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      }
    });
  };

  const handleToggleActive = async (id: string) => {
    // Optimistic UI update
    setSlides((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
    try {
      await toggleHeroSlideActiveAction(id);
    } catch (err) {
      console.error('Failed to toggle slide active:', err);
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= slides.length) return;

    const copy = [...slides];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;

    // Reassign order
    const updated = copy.map((s, idx) => ({ ...s, order: idx }));
    setSlides(updated);

    try {
      await reorderHeroSlidesAction(updated.map((s) => s.id));
    } catch (err) {
      console.error('Failed to reorder slides:', err);
    }
  };

  const handleDeletePrompt = (slide: HeroSlide) => {
    setSlideToDelete(slide);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!slideToDelete) return;
    setIsDeleting(true);
    try {
      await deleteHeroSlideAction(slideToDelete.id);
      setSlides((prev) => prev.filter((s) => s.id !== slideToDelete.id));
      setDeleteModalOpen(false);
      setSlideToDelete(null);
    } catch (err) {
      console.error('Failed to delete slide:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar inside Tab */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#181916] border border-white/10">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#bbff1bff] uppercase font-bold">
            HOMEPAGE HERO SHOWCASE ({slides.length})
          </span>
          <h2 className="text-base sm:text-lg font-black text-white">
            Dynamic Carousel Slides
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Slides here cycle automatically on the homepage hero section. Changes update instantly.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-bold transition-all border border-white/10"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Site</span>
          </a>

          <button
            onClick={handleAddNew}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#bbff1bff] hover:bg-[#a8ec08] text-black text-xs font-black tracking-wide transition-all shadow-lg hover:shadow-[#bbff1bff]/20 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Hero Slide</span>
          </button>
        </div>
      </div>

      {/* Slides Grid / List */}
      <div className="space-y-3">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`group p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
              slide.active
                ? 'bg-[#181916] border-white/10 hover:border-white/20'
                : 'bg-[#141512]/60 border-white/5 opacity-60'
            }`}
          >
            {/* Left: Thumbnail & Content */}
            <div className="flex items-start sm:items-center gap-4 min-w-0">
              {/* Order Indicator & Move Arrows */}
              <div className="flex flex-col items-center justify-center gap-1 shrink-0">
                <button
                  disabled={index === 0}
                  onClick={() => handleMove(index, 'up')}
                  className="p-1 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-colors"
                  title="Move slide up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono font-bold text-neutral-400">
                  #{index + 1}
                </span>
                <button
                  disabled={index === slides.length - 1}
                  onClick={() => handleMove(index, 'down')}
                  className="p-1 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-colors"
                  title="Move slide down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Slide Thumbnail */}
              <div className="relative w-28 h-20 sm:w-36 sm:h-24 rounded-xl overflow-hidden bg-neutral-900 border border-white/15 shrink-0">
                {slide.image ? (
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    sizes="144px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-600 text-[10px]">
                    No image
                  </div>
                )}

                {/* Badge Overlay */}
                <span className="absolute bottom-1.5 left-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-black/80 text-white backdrop-blur-xs max-w-[90%] truncate">
                  {slide.tag || 'Slide'}
                </span>
              </div>

              {/* Title & Specs */}
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#b88628] bg-[#b88628]/10 px-2 py-0.5 rounded-md border border-[#b88628]/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#b88628]" />
                    {slide.badge}
                  </span>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                      slide.active
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-neutral-500/10 text-neutral-400 border-neutral-500/20'
                    }`}
                  >
                    {slide.active ? 'Active on Homepage' : 'Hidden'}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white truncate">
                  {slide.title}
                </h3>
                <p className="text-xs text-neutral-400 line-clamp-1 max-w-xl">
                  {slide.subtitle}
                </p>

                {/* Specs Chips */}
                {slide.specs && slide.specs.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {slide.specs.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[10px] text-neutral-400 bg-white/5 px-2 py-0.5 rounded border border-white/5"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 shrink-0 justify-end pt-2 md:pt-0 border-t border-white/5 md:border-t-0">
              {/* Toggle Active Button */}
              <button
                type="button"
                onClick={() => handleToggleActive(slide.id)}
                className={`p-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  slide.active
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
                    : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                }`}
                title={slide.active ? 'Click to hide from homepage' : 'Click to activate on homepage'}
              >
                {slide.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                <span className="hidden sm:inline">{slide.active ? 'Visible' : 'Hidden'}</span>
              </button>

              {/* Edit Button */}
              <button
                type="button"
                onClick={() => handleEdit(slide)}
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-bold transition-colors border border-white/10 flex items-center gap-1.5 cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Edit</span>
              </button>

              {/* Delete Button */}
              <button
                type="button"
                onClick={() => handleDeletePrompt(slide)}
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold transition-colors border border-red-500/20 flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Delete</span>
              </button>
            </div>
          </div>
        ))}

        {slides.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-[#181916] border border-white/10">
            <Sliders className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">No Hero Slides Found</h3>
            <p className="text-xs text-neutral-400 mb-4">
              Add your first dynamic hero carousel slide to showcase stalls on the homepage.
            </p>
            <button
              onClick={handleAddNew}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#bbff1bff] text-black text-xs font-black"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Create Slide</span>
            </button>
          </div>
        )}
      </div>

      {/* Hero Slide Drawer */}
      <HeroSlideDrawer
        isOpen={isDrawerOpen}
        slide={activeSlide}
        totalSlidesCount={slides.length}
        onClose={() => setIsDrawerOpen(false)}
        onSaved={handleSaved}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        title={slideToDelete?.title || 'Hero Slide'}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setDeleteModalOpen(false);
          setSlideToDelete(null);
        }}
        isDeleting={isDeleting}
      />
    </div>
  );
}
