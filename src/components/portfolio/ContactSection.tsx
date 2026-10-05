import React, { useState } from 'react';
import { Mail, Github, Linkedin, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Profile } from '../../types/portfolio';

interface ContactSectionProps {
  profile: Profile;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulating message transmission / mailto fallback
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      // Open mailto link so user can send immediately from their mail client as well
      const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
        formData.subject || 'Portfolio Inquiry'
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
    }, 600);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-secondary relative">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-crimson-accent uppercase tracking-widest">
            <span className="w-5 h-[1px] bg-crimson" />
            07 / Get in Touch
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary">
            Contact
          </h2>
          <p className="text-sm text-text-secondary max-w-xl">
            Interested in internship opportunities, technical collaborations, or discussing data analytics and cyber security projects? Reach out directly.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Coordinates Info */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 space-y-6">
              <h3 className="text-base font-semibold text-text-primary">
                Direct Coordinates
              </h3>

              <div className="space-y-4 text-sm">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3.5 text-text-secondary hover:text-white group transition-colors"
                >
                  <div className="p-2.5 rounded-lg bg-bg-secondary border border-border-subtle group-hover:border-crimson transition-colors shrink-0">
                    <Mail className="w-4 h-4 text-crimson" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-text-muted">Email</span>
                    <span className="font-medium text-text-primary">{profile.email}</span>
                  </div>
                </a>

                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 text-text-secondary hover:text-white group transition-colors"
                >
                  <div className="p-2.5 rounded-lg bg-bg-secondary border border-border-subtle group-hover:border-crimson transition-colors shrink-0">
                    <Linkedin className="w-4 h-4 text-crimson" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-text-muted">LinkedIn</span>
                    <span className="font-medium text-text-primary">Connect on LinkedIn</span>
                  </div>
                </a>

                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 text-text-secondary hover:text-white group transition-colors"
                >
                  <div className="p-2.5 rounded-lg bg-bg-secondary border border-border-subtle group-hover:border-crimson transition-colors shrink-0">
                    <Github className="w-4 h-4 text-crimson" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-text-muted">GitHub</span>
                    <span className="font-medium text-text-primary">View Repositories</span>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 text-text-secondary">
                  <div className="p-2.5 rounded-lg bg-bg-secondary border border-border-subtle shrink-0">
                    <MapPin className="w-4 h-4 text-crimson" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-text-muted">Location</span>
                    <span className="font-medium text-text-primary">{profile.location || 'India'}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-8">
              {isSent ? (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="text-lg font-bold text-text-primary">Message Prepared</h3>
                  <p className="text-sm text-text-secondary max-w-sm mx-auto">
                    Your email client has been launched with your message. You can also contact me directly at{' '}
                    <span className="text-crimson-accent font-mono">{profile.email}</span>.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => {
                      setIsSent(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="block text-xs font-mono text-text-secondary">
                        Your Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-bg-secondary border border-border-subtle text-text-primary placeholder:text-text-muted text-sm focus:border-crimson focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="block text-xs font-mono text-text-secondary">
                        Your Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-bg-secondary border border-border-subtle text-text-primary placeholder:text-text-muted text-sm focus:border-crimson focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="block text-xs font-mono text-text-secondary">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Internship Inquiry / Collaboration"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-bg-secondary border border-border-subtle text-text-primary placeholder:text-text-muted text-sm focus:border-crimson focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="block text-xs font-mono text-text-secondary">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your message here..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-bg-secondary border border-border-subtle text-text-primary placeholder:text-text-muted text-sm focus:border-crimson focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full"
                    isLoading={isSubmitting}
                    icon={<Send className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
