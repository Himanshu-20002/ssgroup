import React from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/adminAuth';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'SS Group Studio Manager | Admin Portal',
  description: 'Manage exhibition stall showcase projects, renders, videos, and specifications.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthed = await isAuthenticated();
  const headerList = await headers();
  const pathname = headerList.get('x-pathname') || '';

  // Allow login page without redirect loop
  if (!isAuthed && !pathname.includes('/admin/login')) {
    // If not authed, let the page check or redirect
  }

  return (
    <div className="min-h-screen bg-[#11120f] text-neutral-100 font-sans selection:bg-[#bbff1bff] selection:text-black">
      {children}
    </div>
  );
}
