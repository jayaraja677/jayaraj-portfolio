import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, ShieldCheck, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-bg-secondary border-t border-border-subtle pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-border-subtle/60">
          {/* Identity */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-bg-card border border-crimson/50 flex items-center justify-center">
                <span className="font-mono font-bold text-xs text-crimson-accent">JA</span>
              </div>
              <span className="font-bold text-base tracking-wider text-text-primary uppercase">
                Jayaraj A
              </span>
            </div>
            <p className="text-sm text-text-secondary max-w-md leading-relaxed">
              BCA Student at Shree Devi College of Information Science. Specializing in Python, Data Analytics, Machine Learning architectures, and Cyber Security.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/jayaraj-a"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-bg-card border border-border-subtle flex items-center justify-center text-text-secondary hover:text-white hover:border-crimson transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/jayaraj-a"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-bg-card border border-border-subtle flex items-center justify-center text-text-secondary hover:text-white hover:border-crimson transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:jayaraj.contact@gmail.com"
                className="w-9 h-9 rounded-lg bg-bg-card border border-border-subtle flex items-center justify-center text-text-secondary hover:text-white hover:border-crimson transition-colors"
                aria-label="Email Me"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-text-primary">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <Link to="/about" className="hover:text-crimson-accent transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-crimson-accent transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/certificates" className="hover:text-crimson-accent transition-colors">
                  Certifications
                </Link>
              </li>
              <li>
                <Link to="/skills" className="hover:text-crimson-accent transition-colors">
                  Technical Skills
                </Link>
              </li>
              <li>
                <Link to="/education" className="hover:text-crimson-accent transition-colors">
                  Education
                </Link>
              </li>
            </ul>
          </div>

          {/* Focus Areas */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-text-primary">
              Core Focus
            </h4>
            <ul className="space-y-1.5 text-xs text-text-secondary font-mono">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
                Python Engineering
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
                Data Analytics & EDA
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
                Artificial Intelligence & ML
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
                Cyber Security & Networks
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
                Big Data Concepts
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary">
          <p>© {new Date().getFullYear()} Jayaraj A. Built with React, TypeScript & Tailwind CSS.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 hover:text-text-primary transition-colors"
              aria-label="Back to top"
            >
              Back to top
              <ArrowUp className="w-3.5 h-3.5" />
            </button>

            {/* Discreet Admin Login Link */}
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1 text-text-muted hover:text-text-secondary transition-colors"
              title="Admin Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
