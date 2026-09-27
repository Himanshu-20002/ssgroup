'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Project } from '@/lib/portfolioService';
import {
  X,
  MapPin,
  Maximize2,
  Clock,
  Layers,
  CheckCircle2,
  Share2,
  Check,
  Video,
  ArrowRight,
  Phone,
} from 'lucide-react';
import WhatsAppIcon from '../icons/WhatsAppIcon';
import { useContact } from '@/context/ContactContext';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [selectedMediaIdx, setSelectedMediaIdx] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [copied, setCopied] = useState(false);
  const { openContact } = useContact();

  useEffect(() => {
    setSelectedMediaIdx(0);
    setShowVideo(false);
    setCopied(false);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const currentImage = project.gallery[selectedMediaIdx] || project.primaryImage;

  const handleShare = () => {
    const url = `${window.location.origin}/portfolio?project=${project.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const encodedWhatsAppText = encodeURIComponent(
    `Hello SS Group! I am interested in getting a quote/concept for a stall like "${project.title}" (${project.dimensions}) at ${project.venue}. Please connect with me.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col border border-neutral-200">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-100 bg-[#fdfbf7] shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-[#24150e] text-white text-xs font-bold uppercase tracking-wider">
              {project.categoryLabel}
            </span>
            <span className="text-xs text-neutral-500 font-semibold hidden sm:inline-block">
              {project.completionYear} Edition
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-xs font-bold text-neutral-700 hover:bg-neutral-50 shadow-2xs transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Project</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-600 hover:text-black transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 lg:p-8 space-y-6 custom-scrollbar">
          {/* Main Media Showcase */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200 shadow-inner flex items-center justify-center">
              {showVideo && project.videoUrl ? (
                <iframe
                  src={project.videoUrl}
                  title={project.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <Image
                  src={currentImage}
                  alt={project.title}
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 1000px"
                />
              )}

              {/* Toggle Video Button Overlay */}
              {project.videoUrl && (
                <button
                  onClick={() => setShowVideo(!showVideo)}
                  className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/80 hover:bg-black text-white text-xs font-bold backdrop-blur-md shadow-lg transition-all cursor-pointer"
                >
                  <Video className="w-4 h-4 text-red-500" />
                  <span>{showVideo ? 'View 3D Renders' : 'Watch Video Walkthrough'}</span>
                </button>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {project.gallery.length > 1 && (
              <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2">
                {project.gallery.map((imgSrc, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedMediaIdx(idx);
                      setShowVideo(false);
                    }}
                    className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      selectedMediaIdx === idx && !showVideo
                        ? 'border-[#c59b27] ring-2 ring-[#c59b27]/30 scale-102'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={imgSrc} alt="" fill className="object-cover" sizes="96px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Core Details Header */}
          <div className="border-b border-neutral-100 pb-5">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#24150e] tracking-tight">
              {project.title}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm font-semibold text-[#5a4234]">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#c59b27]" />
                {project.venue}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-[#bbff1bff] fill-black/20" />
                {project.dimensions}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-600" />
                {project.turnaround}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-400">
              Project Overview & Brief
            </h4>
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Specs Grid: Key Features & Materials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            {/* Highlights */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#faf8f5] border border-amber-900/10 space-y-3">
              <h4 className="text-sm font-bold text-[#24150e] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#88cc00]" />
                Key Fabrication Features
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-700">
                {project.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#c59b27] font-bold mt-0.5">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Materials Breakdown */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#faf8f5] border border-amber-900/10 space-y-3">
              <h4 className="text-sm font-bold text-[#24150e] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#c59b27]" />
                Materials & Structural Finishes
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-700">
                {project.materials.map((mat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#88cc00] font-bold mt-0.5">✓</span>
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="px-5 py-4 bg-[#fdfbf7] border-t border-neutral-200 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-neutral-600 text-center sm:text-left">
            Need a similar custom booth for an upcoming expo? We provide <strong>FREE 3D Design Concepts</strong> within 24 hours.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={`https://wa.me/919661378767?text=${encodedWhatsAppText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>Enquire on WhatsApp</span>
            </a>

            <button
              onClick={() => {
                onClose();
                openContact();
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#24150e] hover:bg-[#3d2719] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#bbff1bff]" />
              <span>Get Detailed Quote</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
