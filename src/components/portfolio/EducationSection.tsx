import React from 'react';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import { Card } from '../ui/Card';
import { Education } from '../../types/portfolio';

interface EducationSectionProps {
  educationList: Education[];
}

export const EducationSection: React.FC<EducationSectionProps> = ({ educationList }) => {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-secondary relative">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-crimson-accent uppercase tracking-widest">
            <span className="w-5 h-[1px] bg-crimson" />
            05 / Academic Foundation
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary">
            Education
          </h2>
          <p className="text-sm text-text-secondary max-w-xl">
            Formal undergraduate academic qualification in Computer Applications.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-border-subtle ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-8">
          {educationList.map((edu) => (
            <div key={edu.id} className="relative group">
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-bg-secondary border-2 border-crimson group-hover:scale-125 transition-transform" />

              <Card className="p-6 group-hover:border-crimson/70">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border-subtle/50">
                  <div>
                    <h3 className="text-lg font-bold text-text-primary group-hover:text-white transition-colors">
                      {edu.degree}
                    </h3>
                    <p className="text-sm font-medium text-crimson-accent">
                      {edu.institution}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-text-muted">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {edu.startYear} — {edu.endYear}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-text-secondary mt-3 leading-relaxed">
                  {edu.description}
                </p>

                {edu.grade && (
                  <div className="mt-4 pt-3 border-t border-border-subtle/40 flex items-center gap-2 text-xs font-mono text-text-muted">
                    <Award className="w-3.5 h-3.5 text-crimson" />
                    <span>Status / Grade: <strong className="text-text-primary">{edu.grade}</strong></span>
                  </div>
                )}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
