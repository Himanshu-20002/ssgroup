'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, ExternalLink, Plus, Sparkles, Loader2 } from 'lucide-react';

interface AdminHeaderProps {
  onAddNew: () => void;
}

export function AdminHeader({ onAddNew }: AdminHeaderProps) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      setLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#141512]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 sm:h-20 gap-4">
        {/* Left: Brand & Badge */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link href="/admin" className="flex items-center gap-2">
            <Image
              src="/logo/logo.png"
              alt="SS Group"
              width={110}
              height={36}
              className="h-7 sm:h-8 w-auto object-contain brightness-125"
            />
          </Link>
          <span className="hidden sm:inline-block h-5 w-[1px] bg-white/20" />
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#bbff1bff]/10 border border-[#bbff1bff]/30 text-[11px] font-bold text-[#bbff1bff] tracking-wider uppercase">
            <Sparkles className="w-3 h-3" />
            Studio Manager
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            href="/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-neutral-300 hover:text-white transition-all"
          >
            <span>Live Portfolio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={onAddNew}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#bbff1bff] hover:bg-lime-300 text-neutral-950 text-xs sm:text-sm font-bold shadow-md hover:shadow-lime-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Stall</span>
          </button>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            title="Log out from admin"
            className="p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-neutral-400 border border-white/10 transition-colors cursor-pointer"
          >
            {loggingOut ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LogOut className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
