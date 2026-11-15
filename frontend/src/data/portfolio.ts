export interface Project {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  href?: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface SocialProfile {
  platform: "linkedin" | "github";
  name: string;
  href: string;
  description: string;
}

export const projects: Project[] = [];

export const socialProfiles: SocialProfile[] = [
  {
    platform: "linkedin",
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/pattusirisanjana-693a303b2/",
    description: "Professional updates and experience.",
  },
  {
    platform: "github",
    name: "GitHub",
    href: "https://github.com/pattusirisanjana-dot",
    description: "Projects, experiments, and code.",
  },
];

export const skillGroups: SkillGroup[] = [
  { title: "Artificial Intelligence", items: ["Intelligent systems", "Applied AI"] },
  { title: "Machine Learning", items: ["Data exploration", "Model thinking"] },
  { title: "Software Development", items: ["Problem solving", "Building for people"] },
];