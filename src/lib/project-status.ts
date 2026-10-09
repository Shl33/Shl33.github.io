export const projectStatuses = [
  'hidden', 'teaser', 'announced', 'development', 'coming-soon', 'released', 'active', 'archived',
] as const;

export type ProjectStatus = (typeof projectStatuses)[number];

export const projectStatusLabels: Record<ProjectStatus, string> = {
  hidden: 'Hidden',
  teaser: 'Teaser',
  announced: 'Announced',
  development: 'In development',
  'coming-soon': 'Coming soon',
  released: 'Released',
  active: 'Active',
  archived: 'Archived',
};

export function isPublicProject(status: ProjectStatus): boolean {
  return status !== 'hidden';
}
