import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { HeroSection } from '../../components/portfolio/HeroSection';
import { AboutSection } from '../../components/portfolio/AboutSection';
import { SkillsSection } from '../../components/portfolio/SkillsSection';
import { ProjectsSection } from '../../components/portfolio/ProjectsSection';
import { CertificatesSection } from '../../components/portfolio/CertificatesSection';
import { EducationSection } from '../../components/portfolio/EducationSection';
import { AchievementsSection } from '../../components/portfolio/AchievementsSection';
import { ContactSection } from '../../components/portfolio/ContactSection';
import { portfolioService } from '../../services/portfolioService';
import {
  Profile,
  Project,
  Certificate,
  Skill,
  Education,
  Achievement,
} from '../../types/portfolio';
import { initialProfile } from '../../data/initialData';

export const HomePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPortfolioData() {
      try {
        const [
          profileData,
          projectsData,
          certificatesData,
          skillsData,
          educationData,
          achievementsData,
        ] = await Promise.all([
          portfolioService.getProfile(),
          portfolioService.getProjects(),
          portfolioService.getCertificates(),
          portfolioService.getSkills(),
          portfolioService.getEducation(),
          portfolioService.getAchievements(),
        ]);

        setProfile(profileData);
        setProjects(projectsData);
        setCertificates(certificatesData);
        setSkills(skillsData);
        setEducation(educationData);
        setAchievements(achievementsData);
      } catch (err) {
        console.error('Failed to load portfolio data', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadPortfolioData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-crimson border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-text-secondary tracking-widest uppercase">
            Loading Portfolio...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-crimson selection:text-white">
      {/* 1. Navbar */}
      <Navbar />

      <main>
        {/* 2. Hero */}
        <HeroSection
          profile={profile}
          projectCount={projects.length}
          skillCount={skills.length}
        />

        {/* 3. About */}
        <AboutSection profile={profile} />

        {/* 4. Skills */}
        <SkillsSection skills={skills} />

        {/* 5. Projects */}
        <ProjectsSection projects={projects} />

        {/* 6. Certifications */}
        <CertificatesSection certificates={certificates} />

        {/* 7. Education */}
        <EducationSection educationList={education} />

        {/* 8. Achievements */}
        <AchievementsSection achievements={achievements} />

        {/* 9. Contact */}
        <ContactSection profile={profile} />
      </main>

      {/* 10. Footer */}
      <Footer />
    </div>
  );
};
