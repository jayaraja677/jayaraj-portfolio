import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { EducationSection } from '../../components/portfolio/EducationSection';
import { portfolioService } from '../../services/portfolioService';
import { Education } from '../../types/portfolio';

export const EducationPage: React.FC = () => {
  const [education, setEducation] = useState<Education[]>([]);

  useEffect(() => {
    portfolioService.getEducation().then(setEducation);
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-16">
      <Navbar />
      <main>
        <EducationSection educationList={education} />
      </main>
      <Footer />
    </div>
  );
};
