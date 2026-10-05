export type SkillCategory = 
  | 'Programming'
  | 'Data Analytics'
  | 'AI/ML'
  | 'Cyber Security'
  | 'Web Development'
  | 'Tools';

export interface Profile {
  id: string;
  fullName: string;
  headline: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  linkedinUrl: string;
  githubUrl: string;
  resumeUrl: string;
  avatarUrl: string;
  updatedAt?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  imageUrl?: string;
  status: 'In Progress' | 'Completed' | 'Maintained' | 'Archived';
  featured: boolean;
  date: string;
  displayOrder?: number;
  createdAt?: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  credentialId?: string;
  verificationUrl?: string;
  fileUrl?: string;
  displayOrder?: number;
  createdAt?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiencyLevel: 'Beginner' | 'Intermediate' | 'Proficient' | 'Advanced' | 'Expert';
  displayOrder?: number;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  startYear: string;
  endYear: string;
  description: string;
  grade?: string;
  displayOrder?: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  linkUrl?: string;
  imageUrl?: string;
  displayOrder?: number;
}

export interface ActivityLog {
  id: string;
  action: 'create' | 'update' | 'delete' | 'login';
  entity: string;
  entityTitle?: string;
  timestamp: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}
