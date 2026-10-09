import { getCollection, type CollectionEntry } from 'astro:content';
import { isPublicProject } from './project-status';

export type Project = CollectionEntry<'projects'>;

export async function getPublicProjects(): Promise<Project[]> {
  const projects = await getCollection('projects', ({ data }) => isPublicProject(data.status));
  return projects.sort((a, b) => {
    if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
    if (a.data.featured) {
      const orderA = a.data.featuredOrder ?? Infinity;
      const orderB = b.data.featuredOrder ?? Infinity;
      if (orderA !== orderB) return orderA < orderB ? -1 : 1;
    }
    const yearDifference = (b.data.year ?? 0) - (a.data.year ?? 0);
    if (yearDifference) return yearDifference;
    return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
  });
}

export function projectUrl(project: Project): string {
  return `/projects/${project.id}`;
}
