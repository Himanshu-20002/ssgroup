import projectsData from '@/data/projects.json';

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: 'custom-wooden' | 'double-decker' | 'island' | 'modular' | 'av-tech' | 'octanorm-stall';
  categoryLabel: string;
  client: string;
  venue: string;
  hall?: string;
  dimensions: string;
  turnaround: string;
  completionYear: string;
  featured: boolean;
  status?: 'published' | 'draft';
  order?: number;
  primaryImage: string;
  gallery: string[];
  videoUrl?: string;
  shortDescription: string;
  description: string;
  features: string[];
  materials: string[];
}

export const CATEGORIES = [
  { id: 'all', label: 'All Stalls' },
  { id: 'custom-wooden', label: 'Custom Wooden' },
  { id: 'double-decker', label: 'Double Decker' },
  { id: 'island', label: 'Island & 4-Side' },
  { id: 'octanorm-stall', label: 'Octanorm Modular' },
  { id: 'modular', label: 'Modular & Hybrid' },
  { id: 'av-tech', label: 'Tech & AV Integrated' },
] as const;

export function getAllProjects(includeDrafts: boolean = false): Project[] {
  const projects = projectsData as Project[];
  if (includeDrafts) {
    return projects;
  }
  return projects.filter((p) => p.status !== 'draft');
}

export function getProjectBySlug(slug: string): Project | undefined {
  return (projectsData as Project[]).find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: string): Project[] {
  const activeProjects = getAllProjects(false);
  if (!category || category === 'all') {
    return activeProjects;
  }
  return activeProjects.filter((p) => p.category === category);
}
