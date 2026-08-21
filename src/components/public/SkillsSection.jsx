import { useState, useMemo } from 'react';
import * as LucideIcons from 'lucide-react';
import { usePortfolio } from '../../hooks/usePortfolio';

const CATEGORY_ORDER = [
  'Languages',
  'Frontend',
  'Backend',
  'Databases',
  'AI & Data',
  'Tools',
  'Platforms',
  'Soft Skills'
];

const CATEGORY_STYLES = {
  'Languages': {
    text: 'bg-gradient-to-r from-pink-500 to-rose-500',
    dot: 'bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.8)]',
    border: 'group-hover:border-pink-500/30',
  },
  'Frontend': {
    text: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    dot: 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]',
    border: 'group-hover:border-blue-500/30',
  },
  'Backend': {
    text: 'bg-gradient-to-r from-emerald-500 to-teal-500',
    dot: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]',
    border: 'group-hover:border-emerald-500/30',
  },
  'Databases': {
    text: 'bg-gradient-to-r from-orange-500 to-amber-500',
    dot: 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]',
    border: 'group-hover:border-orange-500/30',
  },
  'AI & Data': {
    text: 'bg-gradient-to-r from-violet-500 to-purple-500',
    dot: 'bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]',
    border: 'group-hover:border-violet-500/30',
  },
  'Tools': {
    text: 'bg-gradient-to-r from-amber-500 to-yellow-500',
    dot: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]',
    border: 'group-hover:border-amber-500/30',
  },
  'Platforms': {
    text: 'bg-gradient-to-r from-cyan-500 to-sky-500',
    dot: 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]',
    border: 'group-hover:border-cyan-500/30',
  },
  'Soft Skills': {
    text: 'bg-gradient-to-r from-teal-500 to-emerald-500',
    dot: 'bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.8)]',
    border: 'group-hover:border-teal-500/30',
  },
};

function getIcon(iconName) {
  if (!iconName) return null;
  const pascalCase = iconName
    .split(/[-_]/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
  return LucideIcons[pascalCase] || null;
}

export default function SkillsSection() {
  const { skills, loading } = usePortfolio();
  const [openCategory, setOpenCategory] = useState(CATEGORY_ORDER[0]);

  const groupedSkills = useMemo(() => {
    if (!skills || !Array.isArray(skills) || skills.length === 0) return {};
    const groups = {};
    CATEGORY_ORDER.forEach((cat) => {
      const items = skills.filter((s) => s.category === cat);
      if (items.length > 0) {
        groups[cat] = items;
      }
    });
    skills.forEach((s) => {
      if (!CATEGORY_ORDER.includes(s.category)) {
        if (!groups[s.category]) groups[s.category] = [];
        groups[s.category].push(s);
      }
    });
    return groups;
  }, [skills]);

  return (
    <section id="skills" className="py-16 md:py-24 px-4 relative overflow-hidden bg-gray-50/50 dark:bg-[#0a0a0f]">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto z-10">

        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-indigo-50/80 dark:bg-indigo-500/10 border border-indigo-100/50 dark:border-indigo-500/20 backdrop-blur-md mb-4 shadow-sm">
            <LucideIcons.Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300 tracking-wider uppercase">
              Technical Arsenal
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight">
            <span className="text-gray-900 dark:text-white">Skills & </span>
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            The programming languages, frameworks, and engineering tools I leverage to build intelligent, scalable systems.
          </p>

          {/* Mobile Interaction Hint */}
          <div className="md:hidden mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-sm animate-bounce text-gray-600 dark:text-gray-300">
            <LucideIcons.Touchpad className="w-4 h-4" />
            <span className="text-sm font-semibold">Tap categories to explore</span>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-32 bg-white/40 dark:bg-gray-800/40 rounded-2xl animate-pulse backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50" />
            ))}
          </div>
        ) : Object.keys(groupedSkills).length === 0 ? (
          <div className="text-center py-16 bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-white/60 dark:border-gray-800/80 shadow-xl">
            <p className="text-base text-gray-500 dark:text-gray-400 font-medium">No skills available to display right now.</p>
          </div>
        ) : (
          /* Glassmorphism Grid Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {Object.entries(groupedSkills).map(([category, items]) => {
              const style = CATEGORY_STYLES[category] || CATEGORY_STYLES.Tools;
              const isOpen = openCategory === category;

              return (
                <div
                  key={category}
                  className={`group bg-white/70 dark:bg-[#12121a]/70 backdrop-blur-xl rounded-2xl border border-white/60 dark:border-gray-800/80 p-4 sm:p-5 flex flex-col shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-1 ${style.border}`}
                >
                  {/* Category Header */}
                  <div
                    onClick={() => setOpenCategory(isOpen ? null : category)}
                    className="flex items-center justify-between pb-3 border-b border-gray-200/50 dark:border-gray-800/50 cursor-pointer md:cursor-default"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="relative flex items-center justify-center w-5 h-5">
                        <div className={`absolute inset-0 rounded-full ${style.dot} opacity-20 group-hover:animate-ping`} />
                        <div className={`relative w-2 h-2 rounded-full ${style.dot}`} />
                      </div>
                      <h3 className={`text-sm font-black tracking-widest uppercase bg-clip-text text-transparent ${style.text}`}>
                        {category}
                      </h3>
                    </div>
                    {/* Accordion Chevron - Mobile Only */}
                    <div className={`md:hidden w-7 h-7 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 transition-colors ${isOpen ? 'bg-indigo-50 dark:bg-indigo-500/20' : ''}`}>
                      <LucideIcons.ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-500' : 'text-gray-400'}`}
                      />
                    </div>
                  </div>

                  {/* Skills Pill Cloud */}
                  <div
                    className={`grid transition-all duration-500 ease-in-out md:grid-rows-[1fr] md:opacity-100 md:mt-3 ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 mt-0'
                      }`}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-wrap gap-2 pt-1 pb-1">
                        {items.map((skill) => {
                          const Icon = getIcon(skill.icon_name);
                          return (
                            <div
                              key={skill.id}
                              className="group/pill flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-lg border border-gray-200/80 dark:border-gray-700/60 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:scale-105 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:text-indigo-700 dark:hover:text-indigo-300 hover:shadow-md transition-all duration-300 cursor-default"
                            >
                              {Icon && (
                                <Icon className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover/pill:text-indigo-500 transition-colors" />
                              )}
                              <span className="truncate">{skill.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}