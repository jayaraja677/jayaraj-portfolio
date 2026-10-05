import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDownRight } from 'lucide-react';
import { Profile } from '../../types/portfolio';

interface HeroSectionProps {
  profile: Profile;
  projectCount?: number;
  skillCount?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  projectCount = 4,
  skillCount = 16,
}) => {
  const [imgError, setImgError] = useState(false);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const imageSrc = profile.avatarUrl || '/profile.jpg';

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-24 pb-8 px-4 sm:px-6 lg:px-10 overflow-hidden bg-bg-primary select-none">
      {/* ========================================================
          BACKGROUND LAYER: OVERSIZED "PORTFOLIO" TYPOGRAPHY
          Partially cropped, very dark muted crimson, zero neon glow
         ======================================================== */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-start z-0"
        aria-hidden="true"
      >
        <span
          className="font-display font-black text-[22vw] leading-none tracking-tighter uppercase select-none text-[#1b060a] opacity-80 whitespace-nowrap transform -translate-x-[4%] translate-y-[2%] transition-opacity duration-700"
          style={{ letterSpacing: '-0.05em' }}
        >
          PORTFOLIO
        </span>
      </div>

      {/* ========================================================
          TOP EDITORIAL METADATA ROW
         ======================================================== */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto pt-2 pb-6 border-b border-border-subtle/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[10px] md:text-[11px] tracking-[0.25em] text-text-secondary uppercase">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
          <span className="text-text-primary font-semibold">{profile.fullName}</span>
          <span className="text-border-subtle">•</span>
          <span>BCA / DEVELOPER PORTFOLIO</span>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <span className="text-crimson-accent font-medium">AVAILABLE FOR</span>
          <span>INTERNSHIPS & COLLABORATIONS</span>
        </div>
      </div>

      {/* ========================================================
          MAIN EDITORIAL HERO GRID: ASYMMETRIC COMPOSITION
         ======================================================== */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto my-auto py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Name, Discipline Focus, Short Bio & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 lg:space-y-8 order-2 lg:order-1">
            
            {/* Massive Editorial Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2"
            >
              <div className="inline-block text-[11px] font-mono tracking-[0.3em] uppercase text-crimson-accent mb-1">
                Shree Devi College of Information Science
              </div>
              <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[104px] tracking-tight uppercase leading-[0.88] text-text-primary">
                {profile.fullName}
              </h1>
            </motion.div>

            {/* Clean Focus Tagline with | Separators (No Pills / Badges) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-xs sm:text-sm md:text-[13px] tracking-[0.16em] uppercase text-text-secondary leading-relaxed pt-1"
            >
              <span className="text-text-primary font-semibold">BCA STUDENT</span>
              <span className="text-crimson mx-2.5">|</span>
              <span className="text-text-primary font-semibold">DATA ANALYTICS</span>
              <span className="text-crimson mx-2.5">|</span>
              <span className="text-text-primary font-semibold">PYTHON</span>
              <span className="text-crimson mx-2.5">|</span>
              <span className="text-text-primary font-semibold">AI</span>
              <span className="text-crimson mx-2.5">|</span>
              <span className="text-text-primary font-semibold">CYBER SECURITY</span>
            </motion.div>

            {/* Concise Editorial Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="text-text-secondary text-sm sm:text-base max-w-xl font-sans leading-relaxed tracking-normal"
            >
              Building data-driven solutions with Python, analytics, AI and cybersecurity. Focused on exploratory data pipelines, machine learning models, and defensive network integrity.
            </motion.p>

            {/* Editorial-Style Links / Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-3 font-mono text-xs tracking-[0.18em] uppercase"
            >
              {/* View Projects */}
              <button
                onClick={scrollToProjects}
                className="group inline-flex items-center gap-2 px-5 py-3 bg-bg-card border border-border-subtle hover:border-crimson text-text-primary hover:text-white transition-all duration-300"
              >
                <span>VIEW PROJECTS</span>
                <ArrowRight className="w-3.5 h-3.5 text-crimson group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Download Resume */}
              <a
                href={profile.resumeUrl || '/resume.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="group inline-flex items-center gap-2 px-5 py-3 bg-transparent border border-border-subtle hover:border-crimson text-text-secondary hover:text-white transition-all duration-300"
              >
                <span>DOWNLOAD RESUME</span>
                <ArrowDownRight className="w-3.5 h-3.5 text-crimson group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </a>

              {/* Contact Link */}
              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 px-4 py-3 text-text-secondary hover:text-crimson-accent border-b border-transparent hover:border-crimson transition-all duration-300"
              >
                <span>CONTACT →</span>
              </button>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Editorial Portrait + Vertical Metadata Block */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-center sm:items-end justify-center lg:justify-end gap-6 sm:gap-8 order-1 lg:order-2">
            
            {/* The Main Profile Photograph Composition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative group w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[390px]"
            >
              {/* Architectural Offset Crimson Frame */}
              <div
                className="absolute -top-3 -right-3 w-full h-full border border-crimson/50 pointer-events-none transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                aria-hidden="true"
              />

              {/* Outer Dark Portrait Enclosure */}
              <div className="relative bg-bg-card border border-border-subtle overflow-hidden aspect-[3/4] shadow-2xl">
                {!imgError ? (
                  <img
                    src={imageSrc}
                    alt={profile.fullName}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700 ease-out"
                    loading="eager"
                  />
                ) : (
                  /* Safe Editorial Fallback - Stylized Dark Crimson Card */
                  <div className="w-full h-full flex flex-col justify-between p-6 bg-gradient-to-b from-bg-card via-bg-secondary to-[#150608]">
                    <div className="flex justify-between items-start font-mono text-[10px] text-text-muted">
                      <span>JA // 01</span>
                      <span className="text-crimson">+</span>
                    </div>
                    <div className="text-center space-y-1">
                      <span className="font-display font-black text-7xl text-text-primary block tracking-tighter">
                        JA
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.25em] text-crimson-accent uppercase block">
                        JAYARAJ A
                      </span>
                    </div>
                    <div className="border-t border-border-subtle/50 pt-3 flex justify-between items-end font-mono text-[9px] text-text-muted">
                      <span>PORTRAIT</span>
                      <span>BCA 2026</span>
                    </div>
                  </div>
                )}

                {/* Subtle Vignette & Frame Corner Accent */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 font-mono text-[9px] tracking-widest text-text-secondary uppercase bg-bg-primary/80 px-2 py-0.5 border border-border-subtle">
                  FIG. 01 / PORTRAIT
                </div>
              </div>
            </motion.div>

            {/* Compact Vertical Information Block */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex sm:flex-col justify-between w-full sm:w-auto gap-4 sm:gap-6 py-2 border-t sm:border-t-0 sm:border-l border-border-subtle sm:pl-6 shrink-0 font-mono"
            >
              {/* Projects Metric */}
              <div className="space-y-0.5">
                <span className="font-display font-bold text-2xl sm:text-3xl text-text-primary block leading-none">
                  0{projectCount}+
                </span>
                <span className="text-[10px] text-text-secondary tracking-[0.2em] uppercase block">
                  PROJECTS
                </span>
              </div>

              {/* Technologies / Skills Metric */}
              <div className="space-y-0.5">
                <span className="font-display font-bold text-2xl sm:text-3xl text-text-primary block leading-none">
                  {skillCount}+
                </span>
                <span className="text-[10px] text-text-secondary tracking-[0.2em] uppercase block">
                  TECHNOLOGIES
                </span>
              </div>

              {/* Program */}
              <div className="space-y-0.5">
                <span className="font-display font-bold text-2xl sm:text-3xl text-crimson-accent block leading-none">
                  BCA
                </span>
                <span className="text-[10px] text-text-secondary tracking-[0.2em] uppercase block">
                  UNDERGRAD
                </span>
              </div>

              {/* Graduation Year */}
              <div className="space-y-0.5">
                <span className="font-display font-bold text-2xl sm:text-3xl text-text-primary block leading-none">
                  2026
                </span>
                <span className="text-[10px] text-text-secondary tracking-[0.2em] uppercase block">
                  GRADUATION
                </span>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ========================================================
          SELECTED PROJECTS EDITORIAL TRANSITION DIVIDER
         ======================================================== */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto pt-6 border-t border-border-subtle flex items-center justify-between font-mono text-xs tracking-[0.22em] uppercase text-text-secondary">
        <div className="flex items-center gap-3">
          <span className="w-6 h-[1px] bg-crimson" />
          <span className="text-text-primary font-semibold">SELECTED PROJECTS</span>
          <span className="text-[10px] text-text-muted hidden sm:inline-block">• 01 / WORKS</span>
        </div>

        <button
          onClick={scrollToProjects}
          className="inline-flex items-center gap-1.5 text-text-secondary hover:text-crimson-accent transition-colors py-1 group"
        >
          <span>VIEW ALL</span>
          <ArrowRight className="w-3.5 h-3.5 text-crimson group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
