import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { AboutSection } from '../../components/portfolio/AboutSection';
import { portfolioService } from '../../services/portfolioService';
import { Profile } from '../../types/portfolio';
import { initialProfile } from '../../data/initialData';

export const AboutPage: React.FC = () => {
  const [profile, setProfile] = useState<Profile>(initialProfile);

  useEffect(() => {
    portfolioService.getProfile().then(setProfile);
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-16">
      <Navbar />
      <main>
        <AboutSection profile={profile} />
      </main>
      <Footer />
    </div>
  );
};
