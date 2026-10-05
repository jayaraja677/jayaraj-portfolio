import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, FolderGit2, Star, Calendar } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Project } from '../../types/portfolio';

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = selectedFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedFilter);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-secondary relative">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-crimson-accent uppercase tracking-widest">
              <span className="w-5 h-[1px] bg-crimson" />
              03 / Selected Works
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary">
              Featured Projects
            </h2>
            <p className="text-sm text-text-secondary max-w-xl">
              Academic implementations and analytics experiments focusing on Python, exploratory data modeling, and security protocols.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                  selectedFilter === cat
                    ? 'bg-crimson text-white shadow-crimson-sm border border-crimson'
                    : 'bg-bg-card text-text-secondary hover:text-text-primary border border-border-subtle hover:border-crimson/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-xl bg-bg-card border border-border-subtle">
            <FolderGit2 className="w-10 h-10 text-text-muted mx-auto mb-3" />
            <p className="text-sm text-text-secondary">No projects found in this category.</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                >
                  <Card className="flex flex-col justify-between h-full group hover:border-crimson/70 relative overflow-hidden">
                    {/* Featured Stripe */}
                    {project.featured && (
                      <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none select-none">
                        <div className="absolute top-4 -right-8 w-28 bg-crimson text-white text-[9px] font-mono font-bold tracking-wider py-0.5 text-center rotate-45 shadow-sm">
                          FEATURED
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      {/* Top Bar: Category + Date */}
                      <div className="flex items-center justify-between text-xs font-mono text-text-muted">
                        <Badge variant="crimson" size="sm">
                          {project.category}
                        </Badge>
                        <div className="flex items-center gap-1.5 pr-8">
                          <Calendar className="w-3.5 h-3.5 text-text-muted" />
                          <span>{project.date}</span>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-text-primary group-hover:text-white transition-colors leading-snug">
                          {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-bg-secondary text-text-secondary border border-border-subtle group-hover:border-border-subtle/80"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Links */}
                    <div className="pt-6 border-t border-border-subtle/60 mt-6 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-text-muted flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            project.status === 'Completed' ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                        />
                        {project.status}
                      </span>

                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-md bg-bg-secondary border border-border-subtle text-text-secondary hover:text-white hover:border-crimson transition-colors"
                            aria-label={`GitHub Repository for ${project.title}`}
                            title="View Source Code"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.liveDemoUrl && (
                          <a
                            href={project.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-md bg-bg-secondary border border-border-subtle text-text-secondary hover:text-white hover:border-crimson transition-colors"
                            aria-label={`Live Demo for ${project.title}`}
                            title="View Live Prototype"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};
