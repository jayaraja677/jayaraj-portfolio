import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { CertificatesSection } from '../../components/portfolio/CertificatesSection';
import { portfolioService } from '../../services/portfolioService';
import { Certificate } from '../../types/portfolio';

export const CertificatesPage: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    portfolioService.getCertificates().then(setCertificates);
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-16">
      <Navbar />
      <main>
        <CertificatesSection certificates={certificates} />
      </main>
      <Footer />
    </div>
  );
};
