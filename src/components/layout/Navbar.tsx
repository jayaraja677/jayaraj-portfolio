import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  hash: string;
}

const navItems: NavItem[] = [
  { label: 'ABOUT', path: '/about', hash: '#about' },
  { label: 'SKILLS', path: '/skills', hash: '#skills' },
  { label: 'PROJECTS', path: '/projects', hash: '#projects' },
  { label: 'CERTIFICATES', path: '/certificates', hash: '#certificates' },
  { label: 'EDUCATION', path: '/education', hash: '#education' },
  { label: 'ACHIEVEMENTS', path: '/achievements', hash: '#achievements' },
  { label: 'CONTACT', path: '/contact', hash: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.querySelector(item.hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', item.hash);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        scrolled
          ? 'bg-bg-primary/95 border-b border-border-subtle py-3'
          : 'bg-bg-primary/80 border-b border-border-subtle/40 py-4'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between">
          {/* Editorial Minimal Logo */}
          <Link
            to="/"
            className="flex items-center gap-1 group select-none py-1"
            aria-label="Jayaraj A Home"
          >
            <span className="font-display font-black text-2xl tracking-tighter text-text-primary group-hover:text-crimson-accent transition-colors">
              JA
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-crimson inline-block mb-1 group-hover:scale-125 transition-transform" />
          </Link>

          {/* Desktop Editorial Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={(e) => handleLinkClick(e, item)}
                  className={`font-mono text-[11px] tracking-[0.22em] transition-colors relative py-1 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-text-secondary hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-crimson" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Editorial Availability / Action */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              to="/contact"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.2em] text-text-secondary hover:text-crimson-accent border-b border-transparent hover:border-crimson transition-all py-0.5"
            >
              <span>GET IN TOUCH</span>
              <ArrowUpRight className="w-3 h-3 text-crimson" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-text-secondary hover:text-white focus:outline-none transition-colors"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Editorial Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[57px] bottom-0 bg-bg-primary/98 border-t border-border-subtle z-50 flex flex-col justify-between p-6 sm:p-8 overflow-y-auto">
          <div className="space-y-1 pt-4">
            <div className="text-[10px] font-mono tracking-[0.3em] text-crimson uppercase pb-3 border-b border-border-subtle/50 mb-4">
              Navigation Menu
            </div>
            {navItems.map((item, idx) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={(e) => {
                    handleLinkClick(e, item);
                    setIsOpen(false);
                  }}
                  className="flex items-baseline justify-between py-3 border-b border-border-subtle/40 group"
                >
                  <span className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-text-primary group-hover:text-crimson-accent transition-colors">
                    {item.label}
                  </span>
                  <span className="font-mono text-[11px] text-text-muted group-hover:text-crimson transition-colors">
                    0{idx + 1}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="pt-8 pb-4 space-y-4 border-t border-border-subtle">
            <div className="flex flex-col space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">
                Jayaraj A • Portfolio
              </span>
              <span className="text-xs text-text-secondary">
                BCA Student | Data Analytics | Python | AI | Cyber Security
              </span>
            </div>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center w-full py-3 bg-bg-secondary border border-crimson/60 hover:bg-crimson text-white font-mono text-xs tracking-[0.2em] uppercase transition-colors"
            >
              Contact Me →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
