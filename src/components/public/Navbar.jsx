import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import { usePortfolio } from '../../hooks/usePortfolio';

const NAV_LINKS = [
  { label: 'About', href: '#hero' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { profile } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <nav
      className={`fixed left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-out px-4 sm:px-6 ${scrolled ? 'top-2 sm:top-4' : 'top-4 sm:top-6'
        }`}
    >
      {/* Floating Glass Pill Container */}
      <div
        className={`w-full transition-all duration-500 ease-out flex items-center justify-between p-2 rounded-[2rem] bg-white/70 dark:bg-[#0a0a0f]/70 backdrop-blur-xl border border-white/60 dark:border-gray-800/80 shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${scrolled ? 'max-w-6xl' : 'max-w-5xl'
          }`}
      >
        {/* Logo / Profile Picture with Gradient Ring */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="relative group shrink-0 pl-1"
          aria-label="Go to top"
        >
          {/* Animated Gradient Border */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 rounded-full blur-[2px] opacity-70 group-hover:opacity-100 group-hover:animate-spin-slow transition-opacity duration-500" />
          <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden border-[2px] border-white dark:border-gray-900 bg-white dark:bg-gray-800 flex items-center justify-center">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.full_name || 'Profile'}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <span className="text-sm font-bold text-gray-500 dark:text-gray-400">SA</span>
            )}
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1 px-2">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 group overflow-hidden ${isActive
                    ? 'text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]'
                    : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
              >
                {/* Active Link Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-10'
                    }`}
                />
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2 pr-1">
          <div className="w-[1px] h-6 bg-gray-200 dark:bg-gray-800 mx-2" /> {/* Subtle Divider */}
          <ThemeToggle />
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 pr-1 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative p-2.5 rounded-full text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200/50 dark:border-gray-700/50 shadow-sm transition-all duration-300 active:scale-95"
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Glass Card) */}
      <div
        className={`absolute top-[calc(100%+1rem)] left-4 right-4 md:hidden overflow-hidden transition-all duration-500 ease-out origin-top ${mobileOpen ? 'opacity-100 translate-y-0 max-h-[calc(100vh-8rem)]' : 'opacity-0 -translate-y-4 max-h-0'
          }`}
      >
        <div className="p-3 rounded-3xl bg-white/95 dark:bg-[#0a0a0f]/95 backdrop-blur-2xl border border-white/60 dark:border-gray-800/80 shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:shadow-2xl flex flex-col gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative overflow-hidden block px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 group ${isActive
                    ? 'text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
              >
                {/* Active Link Gradient Background for Mobile */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-10'
                    }`}
                />
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}