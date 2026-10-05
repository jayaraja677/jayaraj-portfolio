import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';
import { Card } from '../ui/Card';
import { Certificate } from '../../types/portfolio';

interface CertificatesSectionProps {
  certificates: Certificate[];
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({ certificates }) => {
  return (
    <section id="certificates" className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-primary relative">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-crimson-accent uppercase tracking-widest">
            <span className="w-5 h-[1px] bg-crimson" />
            04 / Credentials
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary">
            Certifications
          </h2>
          <p className="text-sm text-text-secondary max-w-xl">
            Verified technical coursework, certifications, and domain credentials in Python, data analysis, and cyber security fundamentals.
          </p>
        </div>

        {/* Certificates Grid */}
        {certificates.length === 0 ? (
          <div className="p-12 text-center rounded-xl bg-bg-card border border-border-subtle">
            <Award className="w-10 h-10 text-text-muted mx-auto mb-3" />
            <p className="text-sm text-text-secondary">No certificates added yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <Card key={cert.id} className="p-6 flex flex-col justify-between group hover:border-crimson/70">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="p-2.5 rounded-lg bg-bg-secondary border border-border-subtle group-hover:border-crimson/40 transition-colors shrink-0">
                      <Award className="w-5 h-5 text-crimson-accent" />
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-text-muted">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{cert.issueDate}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-text-primary group-hover:text-white transition-colors">
                      {cert.name}
                    </h3>
                    <p className="text-xs text-crimson-accent font-mono font-medium">
                      {cert.issuingOrganization}
                    </p>
                  </div>

                  {cert.credentialId && (
                    <div className="pt-1 flex items-center gap-1.5 text-[11px] font-mono text-text-secondary">
                      <ShieldCheck className="w-3.5 h-3.5 text-text-muted" />
                      <span>ID: {cert.credentialId}</span>
                    </div>
                  )}
                </div>

                <div className="pt-5 border-t border-border-subtle/60 mt-5 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-text-muted">Verified Credential</span>
                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-crimson-accent hover:text-white transition-colors font-mono"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
