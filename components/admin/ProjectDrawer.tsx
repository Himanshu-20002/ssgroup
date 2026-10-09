'use client';

import React, { useState, useEffect } from 'react';
import { Project, CATEGORIES } from '@/lib/portfolioService';
import { ImageUploader } from './ImageUploader';
import { DynamicListInput } from './DynamicListInput';
import { saveProjectAction } from '@/lib/adminActions';
import { parseVideoUrl } from '@/lib/videoHelper';
import {
  X,
  Save,
  Loader2,
  Sparkles,
  Layers,
  MapPin,
  Maximize2,
  Clock,
  Video,
  FileText,
  Star,
  Check,
} from 'lucide-react';

interface ProjectDrawerProps {
  isOpen: boolean;
  project: Project | null;
  onClose: () => void;
  onSaved: (savedProject: Project) => void;
}

export function ProjectDrawer({ isOpen, project, onClose, onSaved }: ProjectDrawerProps) {
  const isEditing = Boolean(project?.id);

  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    slug: '',
    category: 'custom-wooden',
    categoryLabel: 'Custom Wooden',
    client: '',
    venue: '',
    hall: '',
    dimensions: '',
    turnaround: '48 Hours On-Site Setup',
    completionYear: new Date().getFullYear().toString(),
    featured: false,
    status: 'published',
    primaryImage: '',
    gallery: [],
    videoUrl: '',
    shortDescription: '',
    description: '',
    features: [],
    materials: [],
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  // Populate form when editing or resetting
  useEffect(() => {
    if (project) {
      setFormData({ ...project });
    } else {
      setFormData({
        title: '',
        slug: '',
        category: 'custom-wooden',
        categoryLabel: 'Custom Wooden',
        client: '',
        venue: '',
        hall: '',
        dimensions: '',
        turnaround: '48 Hours On-Site Setup',
        completionYear: new Date().getFullYear().toString(),
        featured: false,
        status: 'published',
        primaryImage: '',
        gallery: [],
        videoUrl: '',
        shortDescription: '',
        description: '',
        features: [
          'High-Gloss Duco Finish Wooden Architecture',
          'Concealed Under-Floor Electrical Management',
          '360-Degree Brand Visibility'
        ],
        materials: [
          'Commercial Grade Plywood Core',
          'Polyurethane (PU) Spray Coating',
          'Raised Platform with Laminate Deck'
        ],
      });
    }
    setError('');
  }, [project, isOpen]);

  if (!isOpen) return null;

  // Auto-generate slug when typing title (only if not manually customized)
  const handleTitleChange = (title: string) => {
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');

    setFormData((prev) => ({
      ...prev,
      title,
      slug: !isEditing || !prev.slug ? slug : prev.slug,
    }));
  };

  const handleCategoryChange = (category: Project['category']) => {
    const found = CATEGORIES.find((c) => c.id === category);
    setFormData((prev) => ({
      ...prev,
      category,
      categoryLabel: found?.label || 'Custom Wooden',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim() || !formData.venue?.trim()) {
      setError('Stall Title and Exhibition Venue are required.');
      return;
    }

    if (!formData.gallery || formData.gallery.length === 0) {
      setError('Please upload at least one stall photo or 3D render.');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      const fullProject: Project = {
        id: formData.id || `stall-${formData.slug || Date.now()}`,
        slug: formData.slug || `stall-${Date.now()}`,
        title: formData.title || '',
        category: (formData.category as Project['category']) || 'custom-wooden',
        categoryLabel: formData.categoryLabel || 'Custom Wooden',
        client: formData.client || 'Exhibition Client',
        venue: formData.venue || 'Pragati Maidan, New Delhi',
        hall: formData.hall || '',
        dimensions: formData.dimensions || '12m × 10m (120 sqm)',
        turnaround: formData.turnaround || '48 Hours On-Site Setup',
        completionYear: formData.completionYear || '2024',
        featured: Boolean(formData.featured),
        status: (formData.status as 'published' | 'draft') || 'published',
        primaryImage: formData.primaryImage || formData.gallery[0],
        gallery: formData.gallery || [],
        videoUrl: formData.videoUrl || '',
        shortDescription: formData.shortDescription || '',
        description: formData.description || '',
        features: formData.features || [],
        materials: formData.materials || [],
      };

      const result = await saveProjectAction(fullProject);
      if (result.success && result.project) {
        onSaved(result.project);
        onClose();
      }
    } catch (err) {
      console.error('Failed to save project:', err);
      setError('Failed to save project. Please check fields and try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-2xl w-full bg-[#181916] border-l border-white/10 shadow-2xl flex flex-col text-white">
        {/* Drawer Header */}
        <div className="px-6 py-4.5 border-b border-white/10 flex items-center justify-between bg-[#141512] shrink-0">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#bbff1bff] uppercase font-bold">
              {isEditing ? 'UPDATE EXHIBITION STALL' : 'NEW FABRICATION PROJECT'}
            </span>
            <h2 className="text-lg sm:text-xl font-black text-white">
              {isEditing ? `Edit: ${formData.title || 'Stall'}` : 'Add New Stall to Showcase'}
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

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400">
              {error}
            </div>
          )}

          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 pb-1 border-b border-white/10">
              <FileText className="w-3.5 h-3.5 text-[#bbff1bff]" />
              Basic Stall Information
            </h3>

            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-300">
                Stall Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title || ''}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Bespoke Enterprise 3D Tech Pavilion"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#bbff1bff]"
              />
            </div>

            {/* Slug & Client Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-300">URL Slug</label>
                <input
                  type="text"
                  value={formData.slug || ''}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g. bespoke-tech-pavilion"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-neutral-300 font-mono focus:outline-none focus:border-[#bbff1bff]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-300">Client / Brand Name</label>
                <input
                  type="text"
                  value={formData.client || ''}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  placeholder="e.g. Global Tech Expo"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#bbff1bff]"
                />
              </div>
            </div>

            {/* Category Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-300">Stall Category</label>
              <select
                value={formData.category || 'custom-wooden'}
                onChange={(e) => handleCategoryChange(e.target.value as Project['category'])}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#22241f] border border-white/15 text-sm text-white focus:outline-none focus:border-[#bbff1bff]"
              >
                <option value="octanorm-stall">Octanorm Modular Stall</option>
                <option value="custom-wooden">Custom Wooden Fabrication</option>
                <option value="double-decker">Double Decker VIP Pavilion</option>
                <option value="island">Island &amp; 4-Side Open Stall</option>
                <option value="modular">Modular &amp; Shell Upgrades</option>
                <option value="av-tech">Tech &amp; AV Integrated Booth</option>
              </select>
            </div>
          </div>

          {/* Section 2: Exhibition Venue & Specs */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 pb-1 border-b border-white/10">
              <MapPin className="w-3.5 h-3.5 text-[#bbff1bff]" />
              Venue &amp; Physical Dimensions
            </h3>

            {/* Venue & Hall */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-300">
                  Exhibition Venue <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.venue || ''}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  placeholder="e.g. Pragati Maidan, New Delhi"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#bbff1bff]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-300">Hall / Booth Info</label>
                <input
                  type="text"
                  value={formData.hall || ''}
                  onChange={(e) => setFormData({ ...formData, hall: e.target.value })}
                  placeholder="e.g. Hall 5, Booth A-12"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#bbff1bff]"
                />
              </div>
            </div>

            {/* Dimensions, Turnaround, Completion Year */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-300">Stall Dimensions</label>
                <input
                  type="text"
                  value={formData.dimensions || ''}
                  onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                  placeholder="e.g. 15m × 12m (180 sqm)"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#bbff1bff]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-300">Setup Turnaround</label>
                <input
                  type="text"
                  value={formData.turnaround || ''}
                  onChange={(e) => setFormData({ ...formData, turnaround: e.target.value })}
                  placeholder="e.g. 48 Hours On-Site Setup"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#bbff1bff]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-300">Completion Year</label>
                <input
                  type="text"
                  value={formData.completionYear || ''}
                  onChange={(e) => setFormData({ ...formData, completionYear: e.target.value })}
                  placeholder="e.g. 2024"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#bbff1bff]"
                />
              </div>
            </div>

            {/* Status & Featured Toggles */}
            <div className="pt-2 flex flex-wrap items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={Boolean(formData.featured)}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-lime-400 bg-white/10 border-white/20 focus:ring-0"
                />
                <span className="text-xs font-bold text-neutral-200 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                  Feature on Showcase Homepage
                </span>
              </label>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-neutral-400">Publishing Status:</span>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      status: formData.status === 'published' ? 'draft' : 'published',
                    })
                  }
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    formData.status === 'published'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {formData.status === 'published' ? '● Published Live' : '○ Draft (Hidden)'}
                </button>
              </div>
            </div>
          </div>

          {/* Section 3: Media & Gallery */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 pb-1 border-b border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-[#bbff1bff]" />
              Visual Assets (Photos &amp; Video)
            </h3>

            <ImageUploader
              primaryImage={formData.primaryImage || ''}
              gallery={formData.gallery || []}
              onChange={(primaryImage, gallery) =>
                setFormData({ ...formData, primaryImage, gallery })
              }
            />

            {/* Video Link */}
            {/* Video Link */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-red-500" />
                  Video Walkthrough URL (Optional)
                </label>
                {formData.videoUrl && (() => {
                  const parsed = parseVideoUrl(formData.videoUrl);
                  if (!parsed) return null;
                  return (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#bbff1bff]/10 text-[#bbff1bff] border border-[#bbff1bff]/20 uppercase">
                      ✓ {parsed.type} ready
                    </span>
                  );
                })()}
              </div>
              <input
                type="url"
                value={formData.videoUrl || ''}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                placeholder="e.g. https://www.youtube.com/watch?v=... or https://youtu.be/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-[#bbff1bff]"
              />
              <span className="text-[11px] text-neutral-500 block">
                Paste any YouTube link (watch, share, shorts), Vimeo, or direct .mp4 URL. It will automatically convert to high-speed embed.
              </span>
            </div>
          </div>

          {/* Section 4: Descriptions & Specs */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 pb-1 border-b border-white/10">
              <Layers className="w-3.5 h-3.5 text-[#bbff1bff]" />
              Detailed Descriptions &amp; Materials
            </h3>

            {/* Short Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-300">
                Short Summary (Card Preview)
              </label>
              <textarea
                rows={2}
                value={formData.shortDescription || ''}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                placeholder="1-2 sentences summarizing the booth concept and impact..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#bbff1bff]"
              />
            </div>

            {/* Full Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-300">
                Full Project Overview &amp; Execution Brief
              </label>
              <textarea
                rows={3}
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detailed client brief, structural challenge, visitor flow, and execution highlights..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#bbff1bff]"
              />
            </div>

            {/* Dynamic Features List */}
            <DynamicListInput
              label="Key Fabrication Features"
              items={formData.features || []}
              onChange={(features) => setFormData({ ...formData, features })}
              placeholder="e.g. Private Sound-Dampened VIP Buyer Lounge"
              badgeColor="#88cc00"
            />

            {/* Dynamic Materials List */}
            <DynamicListInput
              label="Materials & Structural Finishes"
              items={formData.materials || []}
              onChange={(materials) => setFormData({ ...formData, materials })}
              placeholder="e.g. Polyurethane (PU) High-Gloss Spray Coating"
              badgeColor="#c59b27"
            />
          </div>
        </form>

        {/* Drawer Sticky Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#141512] shrink-0 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#bbff1bff] hover:bg-lime-300 text-neutral-950 font-bold text-xs sm:text-sm shadow-lg hover:shadow-lime-500/20 transition-all cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Stall...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{isEditing ? 'Save Changes' : 'Save & Publish Stall'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
