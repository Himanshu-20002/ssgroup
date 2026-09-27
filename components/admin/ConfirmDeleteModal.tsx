'use client';

import React from 'react';
import { AlertTriangle, Trash2, X, Loader2 } from 'lucide-react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  stallTitle: string;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDeleteModal({
  isOpen,
  stallTitle,
  isDeleting,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0 -z-10" onClick={onCancel} />

      <div className="bg-[#181916] border border-white/10 rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl text-white space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">Delete Exhibition Stall?</h3>
            <p className="text-xs text-neutral-400">This action cannot be undone.</p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-neutral-300">
          You are about to delete <strong className="text-white font-bold">&ldquo;{stallTitle}&rdquo;</strong> from your portfolio showcase.
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5" />
                <span>Yes, Delete Stall</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
