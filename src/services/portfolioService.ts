import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  Profile,
  Project,
  Certificate,
  Skill,
  Education,
  Achievement,
  ActivityLog,
} from '../types/portfolio';
import {
  initialProfile,
  initialProjects,
  initialCertificates,
  initialSkills,
  initialEducation,
  initialAchievements,
} from '../data/initialData';

// LocalStorage Keys for Mock Layer
const STORAGE_KEYS = {
  PROFILE: 'jayaraj_portfolio_profile',
  PROJECTS: 'jayaraj_portfolio_projects',
  CERTIFICATES: 'jayaraj_portfolio_certificates',
  SKILLS: 'jayaraj_portfolio_skills',
  EDUCATION: 'jayaraj_portfolio_education',
  ACHIEVEMENTS: 'jayaraj_portfolio_achievements',
  ACTIVITY_LOGS: 'jayaraj_portfolio_activity_logs',
};

function getLocal<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    console.warn(`Error reading ${key} from localStorage, using fallback`, error);
    return defaultValue;
  }
}

function setLocal<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage`, error);
  }
}

class PortfolioService {
  // Activity Logging
  async logActivity(action: 'create' | 'update' | 'delete' | 'login', entity: string, title?: string): Promise<void> {
    const log: ActivityLog = {
      id: 'log-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      action,
      entity,
      entityTitle: title,
      timestamp: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('activity_logs').insert([
          {
            action: log.action,
            entity: log.entity,
            entity_title: log.entityTitle,
          },
        ]);
        return;
      } catch (e) {
        console.warn('Failed to log to Supabase activity_logs', e);
      }
    }

    const logs = getLocal<ActivityLog[]>(STORAGE_KEYS.ACTIVITY_LOGS, []);
    logs.unshift(log);
    setLocal(STORAGE_KEYS.ACTIVITY_LOGS, logs.slice(0, 30));
  }

  async getActivityLogs(): Promise<ActivityLog[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('activity_logs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(20);
        if (!error && data) {
          return data.map((d) => ({
            id: d.id,
            action: d.action,
            entity: d.entity,
            entityTitle: d.entity_title,
            timestamp: d.created_at,
          }));
        }
      } catch (e) {
        console.warn('Supabase activity logs error, falling back to local', e);
      }
    }
    return getLocal<ActivityLog[]>(STORAGE_KEYS.ACTIVITY_LOGS, [
      {
        id: 'log-seed-1',
        action: 'login',
        entity: 'System Session',
        entityTitle: 'Admin initialized',
        timestamp: new Date().toISOString(),
      },
    ]);
  }

  // --- PROFILE ---
  async getProfile(): Promise<Profile> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('profiles').select('*').limit(1).single();
        if (!error && data) {
          return {
            id: data.id,
            fullName: data.full_name,
            headline: data.headline,
            bio: data.bio,
            email: data.email,
            phone: data.phone || '',
            location: data.location || '',
            linkedinUrl: data.linkedin_url || '',
            githubUrl: data.github_url || '',
            resumeUrl: data.resume_url || '/resume.pdf',
            avatarUrl: data.avatar_url || '/profile.jpg',
            updatedAt: data.updated_at,
          };
        }
      } catch (e) {
        console.warn('Supabase getProfile error, falling back to local', e);
      }
    }
    return getLocal<Profile>(STORAGE_KEYS.PROFILE, initialProfile);
  }

  async updateProfile(profileData: Partial<Profile>): Promise<Profile> {
    const current = await this.getProfile();
    const updated: Profile = {
      ...current,
      ...profileData,
      updatedAt: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('profiles')
          .update({
            full_name: updated.fullName,
            headline: updated.headline,
            bio: updated.bio,
            email: updated.email,
            phone: updated.phone,
            location: updated.location,
            linkedin_url: updated.linkedinUrl,
            github_url: updated.githubUrl,
            resume_url: updated.resumeUrl,
            avatar_url: updated.avatarUrl,
            updated_at: updated.updatedAt,
          })
          .eq('id', updated.id);
      } catch (e) {
        console.warn('Supabase updateProfile error', e);
      }
    }

    setLocal(STORAGE_KEYS.PROFILE, updated);
    await this.logActivity('update', 'Profile', updated.fullName);
    return updated;
  }

  // --- PROJECTS ---
  async getProjects(): Promise<Project[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('display_order', { ascending: true });
        if (!error && data && data.length > 0) {
          return data.map((d) => ({
            id: d.id,
            title: d.title,
            description: d.description,
            technologies: d.technologies || [],
            category: d.category,
            githubUrl: d.github_url || '',
            liveDemoUrl: d.live_demo_url || '',
            imageUrl: d.image_url || '',
            status: d.status,
            featured: Boolean(d.featured),
            date: d.date || '',
            displayOrder: d.display_order,
            createdAt: d.created_at,
          }));
        }
      } catch (e) {
        console.warn('Supabase getProjects error, using local fallback', e);
      }
    }
    return getLocal<Project[]>(STORAGE_KEYS.PROJECTS, initialProjects);
  }

  async createProject(project: Omit<Project, 'id' | 'createdAt'>): Promise<Project> {
    const newProject: Project = {
      ...project,
      id: 'proj-' + Date.now(),
      createdAt: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .insert([
            {
              title: newProject.title,
              description: newProject.description,
              technologies: newProject.technologies,
              category: newProject.category,
              github_url: newProject.githubUrl,
              live_demo_url: newProject.liveDemoUrl,
              image_url: newProject.imageUrl,
              status: newProject.status,
              featured: newProject.featured,
              date: newProject.date,
              display_order: newProject.displayOrder || 0,
            },
          ])
          .select()
          .single();

        if (!error && data) {
          newProject.id = data.id;
        }
      } catch (e) {
        console.warn('Supabase createProject error', e);
      }
    }

    const projects = await this.getProjects();
    const updated = [newProject, ...projects];
    setLocal(STORAGE_KEYS.PROJECTS, updated);
    await this.logActivity('create', 'Project', newProject.title);
    return newProject;
  }

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const projects = await this.getProjects();
    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Project not found');

    const updatedProject = { ...projects[index], ...updates };
    projects[index] = updatedProject;

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('projects')
          .update({
            title: updatedProject.title,
            description: updatedProject.description,
            technologies: updatedProject.technologies,
            category: updatedProject.category,
            github_url: updatedProject.githubUrl,
            live_demo_url: updatedProject.liveDemoUrl,
            image_url: updatedProject.imageUrl,
            status: updatedProject.status,
            featured: updatedProject.featured,
            date: updatedProject.date,
            display_order: updatedProject.displayOrder,
            updated_at: new Date().toISOString(),
          })
          .eq('id', id);
      } catch (e) {
        console.warn('Supabase updateProject error', e);
      }
    }

    setLocal(STORAGE_KEYS.PROJECTS, projects);
    await this.logActivity('update', 'Project', updatedProject.title);
    return updatedProject;
  }

  async deleteProject(id: string): Promise<void> {
    const projects = await this.getProjects();
    const target = projects.find((p) => p.id === id);
    const filtered = projects.filter((p) => p.id !== id);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('projects').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase deleteProject error', e);
      }
    }

    setLocal(STORAGE_KEYS.PROJECTS, filtered);
    await this.logActivity('delete', 'Project', target?.title || id);
  }

  // --- CERTIFICATES ---
  async getCertificates(): Promise<Certificate[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('certificates')
          .select('*')
          .order('display_order', { ascending: true });
        if (!error && data && data.length > 0) {
          return data.map((d) => ({
            id: d.id,
            name: d.name,
            issuingOrganization: d.issuing_organization,
            issueDate: d.issue_date,
            credentialId: d.credential_id || '',
            verificationUrl: d.verification_url || '',
            fileUrl: d.file_url || '',
            displayOrder: d.display_order,
            createdAt: d.created_at,
          }));
        }
      } catch (e) {
        console.warn('Supabase getCertificates error, using local fallback', e);
      }
    }
    return getLocal<Certificate[]>(STORAGE_KEYS.CERTIFICATES, initialCertificates);
  }

  async createCertificate(cert: Omit<Certificate, 'id' | 'createdAt'>): Promise<Certificate> {
    const newCert: Certificate = {
      ...cert,
      id: 'cert-' + Date.now(),
      createdAt: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('certificates')
          .insert([
            {
              name: newCert.name,
              issuing_organization: newCert.issuingOrganization,
              issue_date: newCert.issueDate,
              credential_id: newCert.credentialId,
              verification_url: newCert.verificationUrl,
              file_url: newCert.fileUrl,
              display_order: newCert.displayOrder || 0,
            },
          ])
          .select()
          .single();
        if (!error && data) {
          newCert.id = data.id;
        }
      } catch (e) {
        console.warn('Supabase createCertificate error', e);
      }
    }

    const certs = await this.getCertificates();
    const updated = [newCert, ...certs];
    setLocal(STORAGE_KEYS.CERTIFICATES, updated);
    await this.logActivity('create', 'Certificate', newCert.name);
    return newCert;
  }

  async updateCertificate(id: string, updates: Partial<Certificate>): Promise<Certificate> {
    const certs = await this.getCertificates();
    const index = certs.findIndex((c) => c.id === id);
    if (index === -1) throw new Error('Certificate not found');

    const updatedCert = { ...certs[index], ...updates };
    certs[index] = updatedCert;

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('certificates')
          .update({
            name: updatedCert.name,
            issuing_organization: updatedCert.issuingOrganization,
            issue_date: updatedCert.issueDate,
            credential_id: updatedCert.credentialId,
            verification_url: updatedCert.verificationUrl,
            file_url: updatedCert.fileUrl,
            display_order: updatedCert.displayOrder,
          })
          .eq('id', id);
      } catch (e) {
        console.warn('Supabase updateCertificate error', e);
      }
    }

    setLocal(STORAGE_KEYS.CERTIFICATES, certs);
    await this.logActivity('update', 'Certificate', updatedCert.name);
    return updatedCert;
  }

  async deleteCertificate(id: string): Promise<void> {
    const certs = await this.getCertificates();
    const target = certs.find((c) => c.id === id);
    const filtered = certs.filter((c) => c.id !== id);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('certificates').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase deleteCertificate error', e);
      }
    }

    setLocal(STORAGE_KEYS.CERTIFICATES, filtered);
    await this.logActivity('delete', 'Certificate', target?.name || id);
  }

  // --- SKILLS ---
  async getSkills(): Promise<Skill[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('display_order', { ascending: true });
        if (!error && data && data.length > 0) {
          return data.map((d) => ({
            id: d.id,
            name: d.name,
            category: d.category,
            proficiencyLevel: d.proficiency_level,
            displayOrder: d.display_order,
          }));
        }
      } catch (e) {
        console.warn('Supabase getSkills error, using local fallback', e);
      }
    }
    return getLocal<Skill[]>(STORAGE_KEYS.SKILLS, initialSkills);
  }

  async createSkill(skill: Omit<Skill, 'id'>): Promise<Skill> {
    const newSkill: Skill = {
      ...skill,
      id: 'sk-' + Date.now(),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('skills')
          .insert([
            {
              name: newSkill.name,
              category: newSkill.category,
              proficiency_level: newSkill.proficiencyLevel,
              display_order: newSkill.displayOrder || 0,
            },
          ])
          .select()
          .single();
        if (!error && data) {
          newSkill.id = data.id;
        }
      } catch (e) {
        console.warn('Supabase createSkill error', e);
      }
    }

    const skills = await this.getSkills();
    const updated = [...skills, newSkill];
    setLocal(STORAGE_KEYS.SKILLS, updated);
    await this.logActivity('create', 'Skill', newSkill.name);
    return newSkill;
  }

  async updateSkill(id: string, updates: Partial<Skill>): Promise<Skill> {
    const skills = await this.getSkills();
    const index = skills.findIndex((s) => s.id === id);
    if (index === -1) throw new Error('Skill not found');

    const updatedSkill = { ...skills[index], ...updates };
    skills[index] = updatedSkill;

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('skills')
          .update({
            name: updatedSkill.name,
            category: updatedSkill.category,
            proficiency_level: updatedSkill.proficiencyLevel,
            display_order: updatedSkill.displayOrder,
          })
          .eq('id', id);
      } catch (e) {
        console.warn('Supabase updateSkill error', e);
      }
    }

    setLocal(STORAGE_KEYS.SKILLS, skills);
    await this.logActivity('update', 'Skill', updatedSkill.name);
    return updatedSkill;
  }

  async deleteSkill(id: string): Promise<void> {
    const skills = await this.getSkills();
    const target = skills.find((s) => s.id === id);
    const filtered = skills.filter((s) => s.id !== id);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('skills').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase deleteSkill error', e);
      }
    }

    setLocal(STORAGE_KEYS.SKILLS, filtered);
    await this.logActivity('delete', 'Skill', target?.name || id);
  }

  // --- EDUCATION ---
  async getEducation(): Promise<Education[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('education')
          .select('*')
          .order('display_order', { ascending: true });
        if (!error && data && data.length > 0) {
          return data.map((d) => ({
            id: d.id,
            degree: d.degree,
            institution: d.institution,
            startYear: d.start_year,
            endYear: d.end_year,
            description: d.description || '',
            grade: d.grade || '',
            displayOrder: d.display_order,
          }));
        }
      } catch (e) {
        console.warn('Supabase getEducation error, using local fallback', e);
      }
    }
    return getLocal<Education[]>(STORAGE_KEYS.EDUCATION, initialEducation);
  }

  async createEducation(edu: Omit<Education, 'id'>): Promise<Education> {
    const newEdu: Education = {
      ...edu,
      id: 'edu-' + Date.now(),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('education')
          .insert([
            {
              degree: newEdu.degree,
              institution: newEdu.institution,
              start_year: newEdu.startYear,
              end_year: newEdu.endYear,
              description: newEdu.description,
              grade: newEdu.grade,
              display_order: newEdu.displayOrder || 0,
            },
          ])
          .select()
          .single();
        if (!error && data) {
          newEdu.id = data.id;
        }
      } catch (e) {
        console.warn('Supabase createEducation error', e);
      }
    }

    const educations = await this.getEducation();
    const updated = [...educations, newEdu];
    setLocal(STORAGE_KEYS.EDUCATION, updated);
    await this.logActivity('create', 'Education', newEdu.degree);
    return newEdu;
  }

  async updateEducation(id: string, updates: Partial<Education>): Promise<Education> {
    const educations = await this.getEducation();
    const index = educations.findIndex((e) => e.id === id);
    if (index === -1) throw new Error('Education not found');

    const updatedEdu = { ...educations[index], ...updates };
    educations[index] = updatedEdu;

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('education')
          .update({
            degree: updatedEdu.degree,
            institution: updatedEdu.institution,
            start_year: updatedEdu.startYear,
            end_year: updatedEdu.endYear,
            description: updatedEdu.description,
            grade: updatedEdu.grade,
            display_order: updatedEdu.displayOrder,
          })
          .eq('id', id);
      } catch (e) {
        console.warn('Supabase updateEducation error', e);
      }
    }

    setLocal(STORAGE_KEYS.EDUCATION, educations);
    await this.logActivity('update', 'Education', updatedEdu.degree);
    return updatedEdu;
  }

  async deleteEducation(id: string): Promise<void> {
    const educations = await this.getEducation();
    const target = educations.find((e) => e.id === id);
    const filtered = educations.filter((e) => e.id !== id);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('education').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase deleteEducation error', e);
      }
    }

    setLocal(STORAGE_KEYS.EDUCATION, filtered);
    await this.logActivity('delete', 'Education', target?.degree || id);
  }

  // --- ACHIEVEMENTS ---
  async getAchievements(): Promise<Achievement[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('achievements')
          .select('*')
          .order('display_order', { ascending: true });
        if (!error && data && data.length > 0) {
          return data.map((d) => ({
            id: d.id,
            title: d.title,
            description: d.description,
            date: d.date || '',
            linkUrl: d.link_url || '',
            imageUrl: d.image_url || '',
            displayOrder: d.display_order,
          }));
        }
      } catch (e) {
        console.warn('Supabase getAchievements error, using local fallback', e);
      }
    }
    return getLocal<Achievement[]>(STORAGE_KEYS.ACHIEVEMENTS, initialAchievements);
  }

  async createAchievement(ach: Omit<Achievement, 'id'>): Promise<Achievement> {
    const newAch: Achievement = {
      ...ach,
      id: 'ach-' + Date.now(),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('achievements')
          .insert([
            {
              title: newAch.title,
              description: newAch.description,
              date: newAch.date,
              link_url: newAch.linkUrl,
              image_url: newAch.imageUrl,
              display_order: newAch.displayOrder || 0,
            },
          ])
          .select()
          .single();
        if (!error && data) {
          newAch.id = data.id;
        }
      } catch (e) {
        console.warn('Supabase createAchievement error', e);
      }
    }

    const achievements = await this.getAchievements();
    const updated = [...achievements, newAch];
    setLocal(STORAGE_KEYS.ACHIEVEMENTS, updated);
    await this.logActivity('create', 'Achievement', newAch.title);
    return newAch;
  }

  async updateAchievement(id: string, updates: Partial<Achievement>): Promise<Achievement> {
    const achievements = await this.getAchievements();
    const index = achievements.findIndex((a) => a.id === id);
    if (index === -1) throw new Error('Achievement not found');

    const updatedAch = { ...achievements[index], ...updates };
    achievements[index] = updatedAch;

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('achievements')
          .update({
            title: updatedAch.title,
            description: updatedAch.description,
            date: updatedAch.date,
            link_url: updatedAch.linkUrl,
            image_url: updatedAch.imageUrl,
            display_order: updatedAch.displayOrder,
          })
          .eq('id', id);
      } catch (e) {
        console.warn('Supabase updateAchievement error', e);
      }
    }

    setLocal(STORAGE_KEYS.ACHIEVEMENTS, achievements);
    await this.logActivity('update', 'Achievement', updatedAch.title);
    return updatedAch;
  }

  async deleteAchievement(id: string): Promise<void> {
    const achievements = await this.getAchievements();
    const target = achievements.find((a) => a.id === id);
    const filtered = achievements.filter((a) => a.id !== id);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('achievements').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase deleteAchievement error', e);
      }
    }

    setLocal(STORAGE_KEYS.ACHIEVEMENTS, filtered);
    await this.logActivity('delete', 'Achievement', target?.title || id);
  }

  // --- UTILITY: RESET TO DEFAULTS ---
  resetToDefaults(): void {
    setLocal(STORAGE_KEYS.PROFILE, initialProfile);
    setLocal(STORAGE_KEYS.PROJECTS, initialProjects);
    setLocal(STORAGE_KEYS.CERTIFICATES, initialCertificates);
    setLocal(STORAGE_KEYS.SKILLS, initialSkills);
    setLocal(STORAGE_KEYS.EDUCATION, initialEducation);
    setLocal(STORAGE_KEYS.ACHIEVEMENTS, initialAchievements);
    setLocal(STORAGE_KEYS.ACTIVITY_LOGS, [
      {
        id: 'log-reset',
        action: 'update',
        entity: 'Portfolio Data',
        entityTitle: 'Reset to default seeds',
        timestamp: new Date().toISOString(),
      },
    ]);
  }
}

export const portfolioService = new PortfolioService();
