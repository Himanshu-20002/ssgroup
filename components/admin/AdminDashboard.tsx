'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project, CATEGORIES } from '@/lib/portfolioService';
import { AdminHeader } from './AdminHeader';
import { ProjectDrawer } from './ProjectDrawer';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import {
  deleteProjectAction,
  toggleFeaturedAction,
  cloneProjectAction,
} from '@/lib/adminActions';
import {
  Search,
  Plus,
  Star,
  Edit2,
  Trash2,
  Copy,
  ExternalLink,
  Layers,
  MapPin,
  Maximize2,
  Eye,
  CheckCircle2,
  AlertCircle,
  Video,
} from 'lucide-react';

interface AdminDashboardProps {
  initialProjects: Project[];
}

export function AdminDashboard({ initialProjects }: AdminDashboardProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Quick Stats
  const stats = useMemo(() => {
    const total = projects.length;
    const published = projects.filter((p) => p.status !== 'draft').length;
    const drafts = projects.filter((p) => p.status === 'draft').length;
    const featured = projects.filter((p) => p.featured).length;
    return { total, published, drafts, featured };
  }, [projects]);

  // Filtered List
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.client.toLowerCase().includes(q) ||
          p.venue.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [projects, selectedCategory, searchQuery]);

  // Handlers
  const handleAddNew = () => {
    setActiveProject(null);
    setIsDrawerOpen(true);
  };

  const handleEdit = (project: Project) => {
    setActiveProject(project);
    setIsDrawerOpen(true);
  };

  const handleSaved = (saved: Project) => {
    setProjects((prev) => {
      const idx = prev.findIndex((p) => p.id === saved.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = saved;
        return copy;
      } else {
        return [saved, ...prev];
      }
    });
  };

  const handleToggleFeatured = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await toggleFeaturedAction(id);
      if (res.success) {
        setProjects((prev) =>
          prev.map((p) => (p.id === id ? { ...p, featured: res.featured } : p))
        );
      }
    } catch (err) {
      console.error('Error toggling featured:', err);
    }
  };

  const handleClone = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await cloneProjectAction(id);
      if (res.success && res.cloned) {
        setProjects((prev) => [res.cloned!, ...prev]);
      }
    } catch (err) {
      console.error('Error cloning project:', err);
    }
  };

  const promptDelete = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    setProjectToDelete(project);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;
    setIsDeleting(true);
    try {
      const res = await deleteProjectAction(projectToDelete.id);
      if (res.success) {
        setProjects((prev) => prev.filter((p) => p.id !== projectToDelete.id));
      }
    } catch (err) {
      console.error('Error deleting project:', err);
    } finally {
      setIsDeleting(false);
      setDeleteModalOpen(false);
      setProjectToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#11120f] text-white flex flex-col">
      {/* Header */}
      <AdminHeader onAddNew={handleAddNew} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Top Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#181916] border border-white/10 space-y-1">
            <span className="text-[11px] font-mono tracking-wider text-neutral-400 uppercase font-bold">
              Total Stalls
            </span>
            <div className="text-2xl sm:text-3xl font-black text-white">{stats.total}</div>
            <p className="text-[11px] text-neutral-500">Fabrication showcases</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#181916] border border-white/10 space-y-1">
            <span className="text-[11px] font-mono tracking-wider text-emerald-400 uppercase font-bold">
              Live Published
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">{stats.published}</div>
            <p className="text-[11px] text-neutral-500">Visible on /portfolio</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#181916] border border-white/10 space-y-1">
            <span className="text-[11px] font-mono tracking-wider text-amber-400 uppercase font-bold">
              Drafts (Hidden)
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">{stats.drafts}</div>
            <p className="text-[11px] text-neutral-500">Work in progress</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#181916] border border-white/10 space-y-1">
            <span className="text-[11px] font-mono tracking-wider text-[#bbff1bff] uppercase font-bold">
              Homepage Gallery ⭐
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#bbff1bff]">{stats.featured}</div>
            <p className="text-[11px] text-neutral-500">Stalls pinned to Homepage Gallery</p>
          </div>
        </div>

        {/* Controls Bar: Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#181916] border border-white/10 p-3 sm:p-4 rounded-2xl">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stalls by title, client, venue..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#bbff1bff]"
            />
          </div>

          {/* Category Dropdown & Quick Add */}
          <div className="flex items-center gap-2.5">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-[#22241f] border border-white/15 text-xs font-semibold text-neutral-200 focus:outline-none focus:border-[#bbff1bff]"
            >
              <option value="all">All Categories ({projects.length})</option>
              <option value="octanorm-stall">Octanorm Modular</option>
              <option value="custom-wooden">Custom Wooden</option>
              <option value="double-decker">Double Decker</option>
              <option value="island">Island &amp; 4-Side</option>
              <option value="modular">Modular &amp; Hybrid</option>
              <option value="av-tech">Tech &amp; AV</option>
            </select>

            <button
              onClick={handleAddNew}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#bbff1bff] hover:bg-lime-300 text-neutral-950 text-xs font-bold transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Stall</span>
            </button>
          </div>
        </div>

        {/* Projects List / Table */}
        <div className="bg-[#181916] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          {filteredProjects.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-neutral-400 text-[11px] uppercase font-bold tracking-wider">
                    <th className="py-3.5 px-4">Stall Preview</th>
                    <th className="py-3.5 px-4">Venue &amp; Client</th>
                    <th className="py-3.5 px-4 hidden md:table-cell">Dimensions</th>
                    <th className="py-3.5 px-4 hidden sm:table-cell">Category</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                    <th className="py-3.5 px-4 text-center">Homepage ⭐</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredProjects.map((project) => {
                    const isDraft = project.status === 'draft';

                    return (
                      <tr
                        key={project.id}
                        onClick={() => handleEdit(project)}
                        className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
                      >
                        {/* Thumbnail & Title */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-neutral-900 border border-white/10 shrink-0">
                              <Image
                                src={project.primaryImage || '/img/hero/hero-stall.png'}
                                alt={project.title}
                                fill
                                className="object-cover"
                                sizes="64px"
                              />
                              {project.videoUrl && (
                                <div className="absolute bottom-1 right-1 p-0.5 rounded bg-black/70 text-red-500">
                                  <Video className="w-2.5 h-2.5" />
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-white group-hover:text-[#bbff1bff] transition-colors line-clamp-1">
                                {project.title}
                              </div>
                              <div className="text-[11px] text-neutral-500 font-mono">
                                {project.slug} • {project.gallery.length} renders
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Venue & Client */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5 text-neutral-300 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span className="truncate max-w-[180px]">{project.venue}</span>
                          </div>
                          <div className="text-[11px] text-neutral-500 truncate max-w-[180px]">
                            {project.client}
                          </div>
                        </td>

                        {/* Dimensions */}
                        <td className="py-3.5 px-4 hidden md:table-cell text-neutral-300">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-xs font-mono">
                            {project.dimensions}
                          </span>
                        </td>

                        {/* Category Badge */}
                        <td className="py-3.5 px-4 hidden sm:table-cell">
                          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-bold text-neutral-300">
                            {project.categoryLabel}
                          </span>
                        </td>

                        {/* Status: Published vs Draft */}
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              isDraft
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            }`}
                          >
                            {isDraft ? '○ Draft' : '● Live'}
                          </span>
                        </td>

                        {/* Featured Star Toggle */}
                        <td className="py-3.5 px-4 text-center">
                          <button
                            type="button"
                            onClick={(e) => handleToggleFeatured(project.id, e)}
                            title={project.featured ? 'Remove from Homepage Gallery' : 'Feature in Homepage Gallery'}
                            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                          >
                            <Star
                              className={`w-4 h-4 ${
                                project.featured
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-neutral-600 hover:text-neutral-400'
                              }`}
                            />
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Live View */}
                            <Link
                              href={`/portfolio?project=${project.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              title="View on Live Portfolio"
                              className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>

                            {/* Clone / Duplicate */}
                            <button
                              type="button"
                              onClick={(e) => handleClone(project.id, e)}
                              title="Duplicate Stall Specs"
                              className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                            >
                              <Copy className="w-4 h-4" />
                            </button>

                            {/* Edit */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(project);
                              }}
                              title="Edit Stall"
                              className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>

                            {/* Delete */}
                            <button
                              type="button"
                              onClick={(e) => promptDelete(project, e)}
                              title="Delete Stall"
                              className="p-1.5 rounded-lg hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16 px-4 space-y-3">
              <Layers className="w-10 h-10 text-neutral-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No Stalls Found</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                No projects matched your search criteria. Clear filters or add a new stall project.
              </p>
              <button
                type="button"
                onClick={handleAddNew}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#bbff1bff] text-neutral-950 font-bold text-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add First Stall</span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Slide-over Studio Drawer */}
      <ProjectDrawer
        isOpen={isDrawerOpen}
        project={activeProject}
        onClose={() => setIsDrawerOpen(false)}
        onSaved={handleSaved}
      />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        stallTitle={projectToDelete?.title || ''}
        isDeleting={isDeleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </div>
  );
}
