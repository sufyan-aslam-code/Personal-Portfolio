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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${scrolled
          ? 'py-3 bg-white/70 dark:bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm'
          : 'py-5 bg-transparent border-b border-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo / Profile Picture */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="relative group shrink-0 flex items-center gap-3"
            aria-label="Go to top"
          >
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden ring-2 ring-gray-200/50 dark:ring-gray-800/50 group-hover:ring-indigo-500 group-hover:shadow-lg group-hover:shadow-indigo-500/20 transition-all duration-300 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.full_name || 'Profile'}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <span className="text-sm font-bold text-gray-500 dark:text-gray-400">SA</span>
              )}
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1 bg-white/60 dark:bg-gray-900/40 backdrop-blur-md p-1 rounded-full border border-gray-200/50 dark:border-gray-800/50 shadow-sm">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${isActive
                        ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                      }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            <div className="flex items-center bg-white/60 dark:bg-gray-900/40 backdrop-blur-md p-1 rounded-full border border-gray-200/50 dark:border-gray-800/50 shadow-sm">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-3 md:hidden">
            <div className="flex items-center bg-white/60 dark:bg-gray-900/40 backdrop-blur-md p-1 rounded-full border border-gray-200/50 dark:border-gray-800/50 shadow-sm">
              <ThemeToggle />
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 bg-white/60 dark:bg-gray-900/40 backdrop-blur-md border border-gray-200/50 dark:border-gray-800/50 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-all active:scale-95"
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Polished dynamic height & deep glassmorphism) */}
      <div
        className={`absolute top-full left-0 right-0 w-full md:hidden overflow-hidden transition-all duration-300 ease-in-out origin-top ${mobileOpen ? 'opacity-100 max-h-[calc(100vh-6rem)]' : 'opacity-0 max-h-0'
          }`}
      >
        <div className="mx-4 mt-3 mb-4 p-3 rounded-2xl bg-white/95 dark:bg-[#0a0a0f]/95 backdrop-blur-2xl border border-gray-200/50 dark:border-gray-800/50 shadow-2xl flex flex-col gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-500/10'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}