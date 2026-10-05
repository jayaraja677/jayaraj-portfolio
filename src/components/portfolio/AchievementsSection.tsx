import React from 'react';
import { Trophy, Calendar, ExternalLink } from 'lucide-react';
import { Card } from '../ui/Card';
import { Achievement } from '../../types/portfolio';

interface AchievementsSectionProps {
  achievements: Achievement[];
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({ achievements }) => {
  return (
    <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-primary relative">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-crimson-accent uppercase tracking-widest">
            <span className="w-5 h-[1px] bg-crimson" />
            06 / Milestones
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary">
            Achievements & Participation
          </h2>
          <p className="text-sm text-text-secondary max-w-xl">
            Academic competitions, technical symposiums, and analytics hackathon participations.
          </p>
        </div>

        {/* Achievements Grid */}
        {achievements.length === 0 ? (
          <div className="p-12 text-center rounded-xl bg-bg-card border border-border-subtle">
            <Trophy className="w-10 h-10 text-text-muted mx-auto mb-3" />
            <p className="text-sm text-text-secondary">No achievements recorded yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((ach) => (
              <Card key={ach.id} className="p-6 flex flex-col justify-between group hover:border-crimson/70">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="p-2.5 rounded-lg bg-bg-secondary border border-border-subtle group-hover:border-crimson/40 transition-colors shrink-0">
                      <Trophy className="w-5 h-5 text-crimson-accent" />
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-text-muted">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{ach.date}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-text-primary group-hover:text-white transition-colors">
                    {ach.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {ach.description}
                  </p>
                </div>

                {ach.linkUrl && (
                  <div className="pt-4 border-t border-border-subtle/50 mt-4 flex justify-end">
                    <a
                      href={ach.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-crimson-accent hover:text-white transition-colors font-mono"
                    >
                      <span>View Details</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
