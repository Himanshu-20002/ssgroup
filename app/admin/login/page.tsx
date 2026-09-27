'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Invalid passcode');
        setIsLoading(false);
        return;
      }

      // Success
      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError('Connection error. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#11120f] relative overflow-hidden text-white font-sans">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-amber-500/10 via-[#bbff1bff]/15 to-transparent rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="bg-[#181916] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {/* Logo & Header */}
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex p-3 rounded-2xl bg-white/5 border border-white/10 mb-2">
              <Image
                src="/logo/logo.png"
                alt="SS Group"
                width={120}
                height={40}
                className="h-8 w-auto object-contain brightness-125"
                priority
              />
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Studio Management Portal
            </h1>
            <p className="text-xs text-neutral-400">
              Enter your authorized passcode to manage exhibition stalls, uploads, and showcase projects.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-400">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
                Access Passcode
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type={showPasscode ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter admin passcode..."
                  required
                  autoFocus
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#bbff1bff] focus:ring-1 focus:ring-[#bbff1bff] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors cursor-pointer"
                >
                  {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !passcode}
              className="w-full py-3.5 rounded-xl bg-[#bbff1bff] hover:bg-lime-300 disabled:opacity-50 text-neutral-950 font-bold text-sm tracking-wide shadow-lg hover:shadow-lime-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Passcode...</span>
                </>
              ) : (
                <>
                  <span>Unlock Admin Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#bbff1bff]" />
              End-to-End Encrypted
            </span>
            <span>Default: <code className="text-neutral-400 font-mono">ssgroup2026</code></span>
          </div>
        </div>
      </div>
    </div>
  );
}
