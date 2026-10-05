import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderGit2,
  Award,
  Wrench,
  Trophy,
  ArrowUpRight,
  Plus,
  Clock,
  CheckCircle,
  Database,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { portfolioService } from '../../services/portfolioService';
import { ActivityLog } from '../../types/portfolio';
import { formatDate } from '../../lib/utils';

export const AdminDashboardOverview: React.FC = () => {
  const [counts, setCounts] = useState({
    projects: 0,
    certificates: 0,
    skills: 0,
    achievements: 0,
  });
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [projects, certificates, skills, achievements, logs] = await Promise.all([
          portfolioService.getProjects(),
          portfolioService.getCertificates(),
          portfolioService.getSkills(),
          portfolioService.getEducation(),
          portfolioService.getActivityLogs(),
        ]);

        setCounts({
          projects: projects.length,
          certificates: certificates.length,
          skills: skills.length,
          achievements: achievements.length,
        });
        setActivities(logs);
      } catch (err) {
        console.error('Failed to load dashboard metrics', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadStats();
  }, []);

  const stats = [
    {
      label: 'Total Projects',
      value: counts.projects,
      icon: FolderGit2,
      link: '/admin/dashboard/projects',
      desc: 'Active & showcased works',
    },
    {
      label: 'Certifications',
      value: counts.certificates,
      icon: Award,
      link: '/admin/dashboard/certificates',
      desc: 'Verified credentials',
    },
    {
      label: 'Skills Listed',
      value: counts.skills,
      icon: Wrench,
      link: '/admin/dashboard/skills',
      desc: 'Categorized capabilities',
    },
    {
      label: 'Milestones & Edu',
      value: counts.achievements,
      icon: Trophy,
      link: '/admin/dashboard/achievements',
      desc: 'Academic highlights',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">
            Overview Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Manage public portfolio sections, verify assets, and track activity logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/admin/dashboard/projects">
            <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
              Add Project
            </Button>
          </Link>
          <Link to="/admin/dashboard/profile">
            <Button variant="secondary" size="sm">
              Edit Profile
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} to={stat.link} className="block group">
              <Card className="p-5 h-full flex flex-col justify-between group-hover:border-crimson/80 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-text-secondary">{stat.label}</span>
                  <div className="p-2 rounded-lg bg-bg-secondary border border-border-subtle group-hover:border-crimson/50 text-crimson-accent transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="my-4">
                  <span className="text-3xl font-extrabold text-text-primary group-hover:text-white transition-colors">
                    {isLoading ? '...' : stat.value}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-text-muted pt-2 border-t border-border-subtle/50">
                  <span>{stat.desc}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Two Column Layout: Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Recent Activity */}
        <div className="lg:col-span-8">
          <Card className="p-6">
            <div className="flex items-center justify-between pb-4 border-b border-border-subtle mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-crimson" />
                <h3 className="text-sm font-semibold text-text-primary">Recent Activity Feed</h3>
              </div>
              <span className="text-[11px] font-mono text-text-muted">Live Session Audit</span>
            </div>

            {activities.length === 0 ? (
              <p className="text-xs text-text-muted py-6 text-center">No recent activity logged.</p>
            ) : (
              <div className="space-y-3">
                {activities.slice(0, 8).map((act) => (
                  <div
                    key={act.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-bg-secondary border border-border-subtle/60 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          act.action === 'create'
                            ? 'bg-emerald-400'
                            : act.action === 'update'
                            ? 'bg-amber-400'
                            : 'bg-crimson'
                        }`}
                      />
                      <div>
                        <span className="font-semibold text-text-primary uppercase tracking-wider text-[10px] font-mono mr-2">
                          [{act.action}]
                        </span>
                        <span className="text-text-secondary">
                          {act.entity}: <strong className="text-text-primary">{act.entityTitle || 'Item'}</strong>
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-text-muted shrink-0 ml-2">
                      {formatDate(act.timestamp)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Quick Tips & System Status */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-semibold text-text-primary">Admin Quick Guidelines</h3>
            <ul className="space-y-2.5 text-xs text-text-secondary leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-crimson shrink-0 mt-0.5" />
                <span>Upload square images for optimal profile display.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-crimson shrink-0 mt-0.5" />
                <span>Attach direct verification links to certificates for recruiters.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-crimson shrink-0 mt-0.5" />
                <span>Changes made here persist immediately in the active database.</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link to="/admin/dashboard/settings">
                <Button variant="outline" size="sm" className="w-full">
                  Configure Database & Keys
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
