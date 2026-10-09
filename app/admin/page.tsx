import React from 'react';
import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/adminAuth';
import { getStoredProjects } from '@/lib/storage/dbStorage';
import { getStoredHeroSlides } from '@/lib/storage/heroStorage';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const isAuthed = await isAuthenticated();
  if (!isAuthed) {
    redirect('/admin/login');
  }

  const [projects, heroSlides] = await Promise.all([
    getStoredProjects(),
    getStoredHeroSlides(),
  ]);

  return (
    <AdminDashboard
      initialProjects={projects}
      initialHeroSlides={heroSlides}
    />
  );
}
