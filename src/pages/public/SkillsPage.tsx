import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { SkillsSection } from '../../components/portfolio/SkillsSection';
import { portfolioService } from '../../services/portfolioService';
import { Skill } from '../../types/portfolio';

export const SkillsPage: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    portfolioService.getSkills().then(setSkills);
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-16">
      <Navbar />
      <main>
        <SkillsSection skills={skills} />
      </main>
      <Footer />
    </div>
  );
};
