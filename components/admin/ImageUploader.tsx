'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, Star, Loader2, ImagePlus, ArrowLeft, ArrowRight } from 'lucide-react';
import { compressImageToWebP } from '@/lib/imageCompressor';

interface ImageUploaderProps {
  primaryImage: string;
  gallery: string[];
  onChange: (primaryImage: string, gallery: string[]) => void;
}

export function ImageUploader({ primaryImage, gallery, onChange }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      const newUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const originalFile = files[i];

        // 1. Auto-compress to WebP in browser
        const compressedFile = await compressImageToWebP(originalFile, 2048, 0.82);

        // 2. Upload
        const formData = new FormData();
        formData.append('file', compressedFile);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          if (data.url) {
            newUrls.push(data.url);
          }
        }
      }

      if (newUrls.length > 0) {
        const updatedGallery = [...gallery, ...newUrls];
        const updatedPrimary = primaryImage || newUrls[0];
        onChange(updatedPrimary, updatedGallery);
      }
    } catch (err) {
      console.error('Error uploading images:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = (url: string) => {
    const updatedGallery = gallery.filter((item) => item !== url);
    let updatedPrimary = primaryImage;
    if (primaryImage === url) {
      updatedPrimary = updatedGallery[0] || '';
    }
    onChange(updatedPrimary, updatedGallery);
  };

  const handleSetPrimary = (url: string) => {
    // Put primary image first in gallery
    const reordered = [url, ...gallery.filter((u) => u !== url)];
    onChange(url, reordered);
  };

  const handleMove = (index: number, direction: 'left' | 'right') => {
    const targetIdx = direction === 'left' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= gallery.length) return;

    const newGallery = [...gallery];
    const temp = newGallery[index];
    newGallery[index] = newGallery[targetIdx];
    newGallery[targetIdx] = temp;

    onChange(newGallery[0], newGallery);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
          Stall Photos &amp; 3D Renders ({gallery.length})
        </label>
        <span className="text-[11px] text-neutral-400">
          Auto-compressed to WebP before upload
        </span>
      </div>

      {/* Drag & Drop Box */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-3 ${
          dragOver
            ? 'border-[#bbff1bff] bg-[#bbff1bff]/5'
            : 'border-white/15 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/30'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-[#bbff1bff]">
          {isUploading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <Upload className="w-6 h-6" />
          )}
        </div>

        <div className="space-y-1">
          <p className="text-xs sm:text-sm font-bold text-white">
            {isUploading ? 'Compressing & Uploading Media...' : 'Click to upload or drag & drop'}
          </p>
          <p className="text-[11px] text-neutral-500">
            JPG, PNG, WebP renders or site photos. Supports multiple selection.
          </p>
        </div>
      </div>

      {/* Uploaded Gallery Grid */}
      {gallery.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
          {gallery.map((url, idx) => {
            const isPrimary = primaryImage === url || (idx === 0 && !primaryImage);

            return (
              <div
                key={idx}
                className={`relative group rounded-xl overflow-hidden aspect-[4/3] bg-neutral-900 border-2 transition-all ${
                  isPrimary
                    ? 'border-[#bbff1bff] ring-2 ring-[#bbff1bff]/20'
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                <Image
                  src={url}
                  alt={`Upload ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="200px"
                />

                {/* Badges Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 p-2 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSetPrimary(url);
                      }}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold shadow-xs cursor-pointer ${
                        isPrimary
                          ? 'bg-[#bbff1bff] text-neutral-950 font-black'
                          : 'bg-black/60 text-white/80 hover:bg-black hover:text-white'
                      }`}
                    >
                      <Star className="w-3 h-3 fill-current" />
                      <span>{isPrimary ? 'Primary Cover' : 'Set Cover'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(url);
                      }}
                      className="p-1 rounded-md bg-black/60 hover:bg-red-600 text-white/80 hover:text-white transition-colors cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Reorder Buttons */}
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {idx > 0 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMove(idx, 'left');
                        }}
                        className="p-1 rounded-md bg-black/70 hover:bg-black text-white cursor-pointer"
                        title="Move Left"
                      >
                        <ArrowLeft className="w-3 h-3" />
                      </button>
                    )}
                    {idx < gallery.length - 1 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMove(idx, 'right');
                        }}
                        className="p-1 rounded-md bg-black/70 hover:bg-black text-white cursor-pointer"
                        title="Move Right"
                      >
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
