import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Database, Shield, BookOpen, MapPin, Mail, ExternalLink } from 'lucide-react';
import { Card } from '../ui/Card';
import { Profile } from '../../types/portfolio';

interface AboutSectionProps {
  profile: Profile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-secondary relative">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-crimson-accent uppercase tracking-widest">
            <span className="w-5 h-[1px] bg-crimson" />
            01 / Background
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary">
            About Me
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Narrative */}
          <div className="lg:col-span-7 space-y-6 text-text-secondary leading-relaxed text-sm sm:text-base">
            <p>
              I am an undergraduate student pursuing my <span className="text-text-primary font-medium">Bachelor of Computer Applications (BCA)</span> at <span className="text-text-primary font-medium">Shree Devi College of Information Science</span>.
            </p>
            <p>
              My academic pursuits and self-driven explorations center around the intersection of <span className="text-text-primary font-medium">Data Analytics</span>, <span className="text-text-primary font-medium">Python engineering</span>, <span className="text-text-primary font-medium">Artificial Intelligence</span>, and <span className="text-text-primary font-medium">Cyber Security</span>. I am fascinated by how structured data pipelines can expose behavioral insights and how defensive security principles safeguard modern networks.
            </p>
            <p>
              Whether processing datasets with Pandas and Scikit-Learn, dissecting network packet anomalies, or building scalable full-stack applications, I prioritize code clarity, disciplined problem solving, and continuous technical growth.
            </p>

            {/* Quick Metadata Card */}
            <div className="p-4 rounded-lg bg-bg-card border border-border-subtle grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-text-secondary">
                <BookOpen className="w-4 h-4 text-crimson shrink-0" />
                <span>Degree: <strong className="text-text-primary">BCA (2023–2026)</strong></span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <MapPin className="w-4 h-4 text-crimson shrink-0" />
                <span>Location: <strong className="text-text-primary">{profile.location || 'India'}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <Mail className="w-4 h-4 text-crimson shrink-0" />
                <span>Email: <strong className="text-text-primary">{profile.email}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <ExternalLink className="w-4 h-4 text-crimson shrink-0" />
                <span>Status: <strong className="text-emerald-400">Open for Internships</strong></span>
              </div>
            </div>
          </div>

          {/* Pillars of Focus */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="p-5 border-l-2 border-l-crimson">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-crimson/15 text-crimson-accent shrink-0">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">Data Analytics & Big Data</h3>
                  <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                    Cleaning, transforming, and modeling data using Python, Pandas, NumPy, and SQL to extract actionable patterns.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 border-l-2 border-l-crimson">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-crimson/15 text-crimson-accent shrink-0">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">Python & AI/ML</h3>
                  <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                    Implementing machine learning models, exploratory statistical algorithms, and automating workflows.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 border-l-2 border-l-crimson">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-crimson/15 text-crimson-accent shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">Cyber Security</h3>
                  <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                    Studying network protocols, vulnerability assessments, threat analysis, and secure code practices.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
