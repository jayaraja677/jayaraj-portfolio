import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { ProjectsSection } from '../../components/portfolio/ProjectsSection';
import { portfolioService } from '../../services/portfolioService';
import { Project } from '../../types/portfolio';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    portfolioService.getProjects().then(setProjects);
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-16">
      <Navbar />
      <main>
        <ProjectsSection projects={projects} />
      </main>
      <Footer />
    </div>
  );
};
