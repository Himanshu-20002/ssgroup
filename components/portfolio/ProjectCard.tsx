'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Project } from '@/lib/portfolioService';
import { MapPin, Maximize2, Share2, Check, Video, ArrowUpRight } from 'lucide-react';
import WhatsAppIcon from '../icons/WhatsAppIcon';

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
  priority?: boolean;
}

export function ProjectCard({ project, onOpenDetails, priority = false }: ProjectCardProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/portfolio?project=${project.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const encodedWhatsAppText = encodeURIComponent(
    `Hi SS Group, I am interested in the "${project.title}" stall design (${project.dimensions} at ${project.venue}). Could you provide a quote/proposal for our upcoming expo?`
  );

  return (
    <div
      onClick={() => onOpenDetails(project)}
      className="group relative rounded-2xl bg-white border border-neutral-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-400/50 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Thumbnail Stage */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
        <Image
          src={project.primaryImage}
          alt={project.title}
          fill
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-[#7a5316] shadow-xs">
            {project.categoryLabel}
          </span>

          <div className="flex items-center gap-1.5">
            {project.videoUrl && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-600/90 text-white text-[10px] font-bold shadow-xs">
                <Video className="w-3 h-3" /> Video
              </span>
            )}
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-mono font-semibold">
              {project.gallery.length} Renders
            </span>
          </div>
        </div>

        {/* Quick Share Button */}
        <button
          onClick={handleShare}
          title="Copy direct link to this project"
          className="absolute bottom-3 right-3 z-10 p-2 rounded-lg bg-white/90 hover:bg-white text-neutral-700 hover:text-black shadow-md transition-all cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
        </button>

        {/* Dimension Pill Bottom Left */}
        <div className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-white text-xs font-bold">
          <Maximize2 className="w-3 h-3 text-[#bbff1bff]" />
          <span>{project.dimensions}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Venue & Location */}
          <div className="flex items-center gap-1.5 text-xs text-[#735338] font-semibold mb-1">
            <MapPin className="w-3.5 h-3.5 text-[#c59b27] shrink-0" />
            <span className="truncate">{project.venue}</span>
          </div>

          {/* Project Title */}
          <h3 className="text-base sm:text-lg font-bold text-[#24150e] group-hover:text-[#946519] transition-colors line-clamp-1">
            {project.title}
          </h3>

          {/* Short Description */}
          <p className="mt-1.5 text-xs sm:text-sm text-neutral-600 line-clamp-2 leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Card Footer: Quick Action Buttons */}
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-neutral-500">
            {project.turnaround}
          </span>

          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/919876543210?text=${encodedWhatsAppText}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title="Chat on WhatsApp about this design"
              className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
            </a>

            <button
              onClick={() => onOpenDetails(project)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <span>View Specs</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
