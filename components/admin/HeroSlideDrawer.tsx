'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { HeroSlide } from '@/lib/heroService';
import { saveHeroSlideAction } from '@/lib/heroActions';
import { DynamicListInput } from './DynamicListInput';
import { compressImageToWebP } from '@/lib/imageCompressor';
import {
  X,
  Save,
  Loader2,
  Sparkles,
  Upload,
  CheckCircle2,
  Eye,
  Sliders,
  Tag,
  Type,
  ListPlus,
  Image as ImageIcon,
} from 'lucide-react';

interface HeroSlideDrawerProps {
  isOpen: boolean;
  slide: HeroSlide | null;
  totalSlidesCount: number;
  onClose: () => void;
  onSaved: (savedSlide: HeroSlide) => void;
}

export function HeroSlideDrawer({
  isOpen,
  slide,
  totalSlidesCount,
  onClose,
  onSaved,
}: HeroSlideDrawerProps) {
  const [formData, setFormData] = useState<Partial<HeroSlide>>({
    image: '',
    badge: '',
    tag: '',
    title: '',
    subtitle: '',
    specs: [],
    order: 0,
    active: true,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEditing = Boolean(slide && slide.id);

  useEffect(() => {
    if (slide) {
      setFormData({
        id: slide.id,
        image: slide.image || '',
        badge: slide.badge || '',
        tag: slide.tag || '',
        title: slide.title || '',
        subtitle: slide.subtitle || '',
        specs: slide.specs || [],
        order: slide.order ?? 0,
        active: slide.active ?? true,
      });
    } else {
      setFormData({
        id: `slide-${Date.now().toString().slice(-6)}`,
        image: '',
        badge: 'Custom 3D Wooden Fabrication',
        tag: 'Bespoke Pavilion',
        title: 'Custom Fabricated Exhibition Stalls',
        subtitle: 'High-impact brand pavilions tailored for maximum visitor engagement and footfall.',
        specs: ['Free 3D Design Concept', 'Factory Rate Pricing', 'Turnkey Fabrication'],
        order: totalSlidesCount,
        active: true,
      });
    }
    setError(null);
  }, [slide, totalSlidesCount, isOpen]);

  if (!isOpen) return null;

  const handleImageFile = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setIsUploading(true);
    setError(null);

    try {
      // 1. Browser compression to WebP
      const compressed = await compressImageToWebP(file, 2048, 0.85);

      // 2. Upload via API (saves to Vercel Blob)
      const data = new FormData();
      data.append('file', compressed);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      if (!res.ok) {
        throw new Error('Upload failed');
      }

      const json = await res.json();
      if (json.url) {
        setFormData((prev) => ({ ...prev, image: json.url }));
      }
    } catch (err: any) {
      console.error('Image upload failed:', err);
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      setError('Please upload or provide an image for the slide.');
      return;
    }
    if (!formData.title?.trim()) {
      setError('Title is required.');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const fullSlide: HeroSlide = {
        id: formData.id || `slide-${Date.now().toString().slice(-6)}`,
        image: formData.image,
        badge: formData.badge || 'Exhibition Fabrication',
        tag: formData.tag || 'Bespoke Stall',
        title: formData.title,
        subtitle: formData.subtitle || '',
        specs: formData.specs && formData.specs.length > 0 ? formData.specs : ['Turnkey Fabrication'],
        order: Number(formData.order) || 0,
        active: formData.active ?? true,
      };

      const result = await saveHeroSlideAction(fullSlide);
      if (result.success && result.slide) {
        onSaved(result.slide);
        onClose();
      }
    } catch (err: any) {
      console.error('Failed to save slide:', err);
      setError(err?.message || 'Failed to save hero slide.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-2xl w-full bg-[#181916] border-l border-white/10 shadow-2xl flex flex-col text-white">
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-white/10 flex items-center justify-between bg-[#141512] shrink-0">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#bbff1bff] uppercase font-bold">
              {isEditing ? 'UPDATE HOMEPAGE CAROUSEL' : 'NEW HOMEPAGE HERO SLIDE'}
            </span>
            <h2 className="text-lg sm:text-xl font-black text-white">
              {isEditing ? `Edit: ${formData.title || 'Slide'}` : 'Add Dynamic Hero Showcase Slide'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400">
              {error}
            </div>
          )}

          {/* Section: Live Preview Card */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#bbff1bff]" />
              Live Homepage Preview
            </label>

            <div className="rounded-2xl border border-stone-300 bg-white p-3.5 text-stone-900 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-[10px] font-bold text-stone-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#b88628]" />
                  {formData.badge || 'Badge Text'}
                </span>
                <span className="text-[10px] font-mono text-stone-400 uppercase font-semibold">
                  {formData.tag || 'Tag'}
                </span>
              </div>

              <div className="relative h-40 w-full rounded-xl overflow-hidden bg-neutral-900 mb-3 flex items-center justify-center border border-stone-200">
                {formData.image ? (
                  <Image
                    src={formData.image}
                    alt={formData.title || 'Preview'}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="text-center text-neutral-500 text-xs flex flex-col items-center gap-1">
                    <ImageIcon className="w-6 h-6 stroke-1 text-neutral-600" />
                    <span>Upload an image to see live preview</span>
                  </div>
                )}
              </div>

              <h4 className="font-extrabold text-sm text-stone-900 leading-tight">
                {formData.title || 'Stall Showcase Title'}
              </h4>
              <p className="text-xs text-stone-600 line-clamp-2 mt-1">
                {formData.subtitle || 'Short descriptive subtitle highlighting the impact of this booth style...'}
              </p>

              {formData.specs && formData.specs.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {formData.specs.map((spec, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200 text-[10px] font-medium text-stone-700"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Section: Slide Photo Upload */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 pb-1 border-b border-white/10">
              <ImageIcon className="w-3.5 h-3.5 text-[#bbff1bff]" />
              Showcase Slide Image (Vercel Blob)
            </h3>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageFile(e.target.files)}
            />

            {formData.image ? (
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/20 bg-neutral-900 group">
                <Image
                  src={formData.image}
                  alt={formData.title || 'Slide photo'}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-1.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors"
                  >
                    Change Image
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: '' })}
                    className="px-3.5 py-1.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-500 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/15 hover:border-[#bbff1bff]/60 rounded-2xl p-6 text-center cursor-pointer transition-all bg-white/[0.02] hover:bg-white/[0.04]"
              >
                {isUploading ? (
                  <div className="flex flex-col items-center justify-center gap-2 py-4">
                    <Loader2 className="w-8 h-8 text-[#bbff1bff] animate-spin" />
                    <span className="text-xs text-neutral-300">Compressing &amp; uploading to Cloud CDN...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 py-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#bbff1bff]">
                      <Upload className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-white">Click to Upload Hero Slide Photo</span>
                    <span className="text-xs text-neutral-400">
                      Auto-compressed to WebP and saved directly to Vercel Blob Cloud CDN
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Section: Slide Headings & Badge */}
          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 pb-1 border-b border-white/10">
              <Type className="w-3.5 h-3.5 text-[#bbff1bff]" />
              Texts &amp; Badges
            </h3>

            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-300">
                Slide Headline / Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Custom Fabricated Exhibition Stalls"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#bbff1bff]"
              />
            </div>

            {/* Subtitle */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-300">
                Subtitle / Value Proposition
              </label>
              <textarea
                rows={2}
                value={formData.subtitle || ''}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="e.g. High-impact brand pavilions tailored for maximum visitor engagement and footfall."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#bbff1bff]"
              />
            </div>

            {/* Badge & Tag Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#bbff1bff]" />
                  Top Badge Label
                </label>
                <input
                  type="text"
                  value={formData.badge || ''}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="e.g. Custom 3D Wooden Fabrication"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#bbff1bff]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#bbff1bff]" />
                  Tag / Architecture Category
                </label>
                <input
                  type="text"
                  value={formData.tag || ''}
                  onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  placeholder="e.g. Bespoke Pavilion"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#bbff1bff]"
                />
              </div>
            </div>
          </div>

          {/* Section: Specs Pills (Dynamic List) */}
          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 pb-1 border-b border-white/10">
              <ListPlus className="w-3.5 h-3.5 text-[#bbff1bff]" />
              Key Specs / Feature Badges
            </h3>

            <DynamicListInput
              label="Feature Badges"
              items={formData.specs || []}
              placeholder="e.g. Free 3D Design Concept"
              onChange={(specs) => setFormData({ ...formData, specs })}
            />
          </div>

          {/* Section: Controls & Visibility */}
          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 pb-1 border-b border-white/10">
              <Sliders className="w-3.5 h-3.5 text-[#bbff1bff]" />
              Visibility &amp; Sequence
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Order */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-300">Display Order</label>
                <input
                  type="number"
                  min={0}
                  value={formData.order ?? 0}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-[#bbff1bff]"
                />
              </div>

              {/* Active Toggle */}
              <div className="space-y-1.5 flex flex-col justify-end">
                <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.active ?? true}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="w-4 h-4 rounded text-[#bbff1bff] focus:ring-0 cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">Active on Homepage</span>
                    <span className="text-[11px] text-neutral-400 block">
                      Toggle off to hide slide without deleting it
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Footer Action Buttons */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-end gap-3 sticky bottom-0 bg-[#181916] py-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || isUploading}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#bbff1bff] hover:bg-[#a8ec08] text-black text-xs font-black tracking-wide transition-all shadow-lg hover:shadow-[#bbff1bff]/20 disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving to Cloud...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{isEditing ? 'Save Changes' : 'Publish Slide'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
