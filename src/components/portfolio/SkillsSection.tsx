import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Skill, SkillCategory } from '../../types/portfolio';
import { Code, Database, Cpu, Shield, Globe, Wrench } from 'lucide-react';

interface SkillsSectionProps {
  skills: Skill[];
}

const categoryIcons: Record<SkillCategory, React.ReactNode> = {
  Programming: <Code className="w-4 h-4 text-crimson" />,
  'Data Analytics': <Database className="w-4 h-4 text-crimson" />,
  'AI/ML': <Cpu className="w-4 h-4 text-crimson" />,
  'Cyber Security': <Shield className="w-4 h-4 text-crimson" />,
  'Web Development': <Globe className="w-4 h-4 text-crimson" />,
  Tools: <Wrench className="w-4 h-4 text-crimson" />,
};

const categories: Array<'All' | SkillCategory> = [
  'All',
  'Programming',
  'Data Analytics',
  'AI/ML',
  'Cyber Security',
  'Web Development',
  'Tools',
];

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | SkillCategory>('All');

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-primary relative">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-crimson-accent uppercase tracking-widest">
            <span className="w-5 h-[1px] bg-crimson" />
            02 / Capabilities
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary">
            Technical Skills
          </h2>
          <p className="text-sm text-text-secondary max-w-xl">
            Core proficiencies spanning analytical computation, Python scripting, machine learning foundations, and system defense.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                selectedCategory === cat
                  ? 'bg-crimson text-white shadow-crimson-sm border border-crimson'
                  : 'bg-bg-card text-text-secondary hover:text-text-primary border border-border-subtle hover:border-crimson/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="p-4 flex flex-col justify-between h-full group hover:border-crimson/60">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="p-1.5 rounded bg-bg-secondary border border-border-subtle group-hover:border-crimson/40 transition-colors">
                        {categoryIcons[skill.category] || <Code className="w-4 h-4 text-crimson" />}
                      </div>
                      <span className="text-[10px] font-mono text-text-muted">
                        {skill.proficiencyLevel}
                      </span>
                    </div>

                    <h3 className="text-sm font-medium text-text-primary group-hover:text-white transition-colors">
                      {skill.name}
                    </h3>
                  </div>

                  <div className="pt-3 border-t border-border-subtle/50 mt-3 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-text-secondary">
                      {skill.category}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-crimson/60 group-hover:bg-crimson transition-colors" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
