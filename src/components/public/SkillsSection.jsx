import { useState, useMemo } from 'react';
import * as LucideIcons from 'lucide-react';
import { usePortfolio } from '../../hooks/usePortfolio';

const CATEGORY_DETAILS = {
  'Languages': {
    icon: LucideIcons.Code2,
    description: 'Core languages for software development.',
    text: 'bg-gradient-to-r from-pink-500 to-rose-500',
    dot: 'bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.8)]',
    border: 'hover:border-pink-500/50',
    bg: 'hover:bg-pink-500/5',
  },
  'Frontend': {
    icon: LucideIcons.Layout,
    description: 'Building responsive interfaces.',
    text: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    dot: 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]',
    border: 'hover:border-blue-500/50',
    bg: 'hover:bg-blue-500/5',
  },
  'Backend': {
    icon: LucideIcons.Server,
    description: 'Scalable server-side architecture.',
    text: 'bg-gradient-to-r from-emerald-500 to-teal-500',
    dot: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]',
    border: 'hover:border-emerald-500/50',
    bg: 'hover:bg-emerald-500/5',
  },
  'Databases': {
    icon: LucideIcons.Database,
    description: 'Data storage and management.',
    text: 'bg-gradient-to-r from-orange-500 to-amber-500',
    dot: 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]',
    border: 'hover:border-orange-500/50',
    bg: 'hover:bg-orange-500/5',
  },
  'Tools': {
    icon: LucideIcons.Wrench,
    description: 'Development and DevOps tooling.',
    text: 'bg-gradient-to-r from-amber-500 to-yellow-500',
    dot: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]',
    border: 'hover:border-amber-500/50',
    bg: 'hover:bg-amber-500/5',
  },
  'Platforms': {
    icon: LucideIcons.Cloud,
    description: 'Cloud and deployment environments.',
    text: 'bg-gradient-to-r from-cyan-500 to-sky-500',
    dot: 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]',
    border: 'hover:border-cyan-500/50',
    bg: 'hover:bg-cyan-500/5',
  },
  'AI & Data': {
    icon: LucideIcons.BrainCircuit,
    description: 'Intelligent systems and data science.',
    text: 'bg-gradient-to-r from-purple-500 to-indigo-500',
    dot: 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]',
    border: 'hover:border-purple-500/50',
    bg: 'hover:bg-purple-500/5',
  },
  'Soft Skills': {
    icon: LucideIcons.Users,
    description: 'Interpersonal and professional skills.',
    text: 'bg-gradient-to-r from-teal-500 to-emerald-500',
    dot: 'bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.8)]',
    border: 'hover:border-teal-500/50',
    bg: 'hover:bg-teal-500/5',
  }
};

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
        <div className="text-left md:text-center mb-10 md:mb-16">
          <div className="hidden md:inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-indigo-50/80 dark:bg-indigo-500/10 border border-indigo-100/50 dark:border-indigo-500/20 backdrop-blur-md mb-4 shadow-sm">
            <LucideIcons.Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300 tracking-wider uppercase">
              Technical Arsenal
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 md:mb-4 tracking-tight uppercase md:normal-case md:leading-normal leading-none">
            <span className="block md:hidden text-gray-900 dark:text-white mb-1">TECHNICAL</span>
            <span className="block md:hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              ARSENAL
            </span>
            <span className="hidden md:inline text-gray-900 dark:text-white">Skills & </span>
            <span className="hidden md:inline bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl md:mx-auto font-medium">
            Technologies I use to build intelligent, scalable systems.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-20 md:h-32 bg-white/40 dark:bg-gray-800/40 rounded-2xl animate-pulse backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50" />
            ))}
          </div>
        ) : Object.keys(groupedSkills).length === 0 ? (
          <div className="text-center py-16 bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-white/60 dark:border-gray-800/80 shadow-xl">
            <p className="text-base text-gray-500 dark:text-gray-400 font-medium">No skills available to display right now.</p>
          </div>
        ) : (
          <>
            {/* Cards Grid / Accordion */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {Object.entries(groupedSkills).map(([category, items]) => {
                const style = CATEGORY_DETAILS[category] || CATEGORY_DETAILS['Tools'];
                const isOpen = openCategory === category;
                const CategoryIcon = style.icon;

                return (
                  <div
                    key={category}
                    className={`group bg-white/70 dark:bg-[#12121a]/80 backdrop-blur-xl rounded-2xl border border-white/60 dark:border-gray-800/60 flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-300 ease-out md:hover:-translate-y-1 md:hover:shadow-2xl overflow-hidden ${style.border} ${style.bg}`}
                  >
                    {/* Category Header */}
                    <div
                      onClick={() => setOpenCategory(isOpen ? null : category)}
                      className="flex items-center justify-between p-4 md:p-5 cursor-pointer md:cursor-default select-none touch-manipulation"
                    >
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 shrink-0 shadow-sm">
                          <div className={`absolute inset-0 rounded-xl ${style.dot} opacity-0 md:group-hover:opacity-20 transition-opacity duration-300`} />
                          <CategoryIcon className={`w-4 h-4 md:w-5 md:h-5 text-gray-700 dark:text-gray-300 relative z-10 md:group-hover:scale-110 transition-transform duration-300`} />
                        </div>
                        <div>
                          <h3 className={`text-sm md:text-base font-bold tracking-wide ${style.text} bg-clip-text text-transparent`}>
                            {category}
                          </h3>
                          <p className="hidden md:block text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {style.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="md:hidden text-xs font-semibold text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                          {items.length}
                        </span>
                        {/* Accordion Chevron - Mobile Only */}
                        <div className={`md:hidden w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 transition-colors ${isOpen ? 'bg-indigo-50 dark:bg-indigo-500/20 border-indigo-100 dark:border-indigo-500/30' : ''}`}>
                          <LucideIcons.ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-500 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500'}`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Skills Content */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out md:grid-rows-[1fr] md:opacity-100 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-4 pb-4 md:px-5 md:pb-5 pt-0 md:pt-0">
                          <p className="md:hidden text-xs text-gray-500 dark:text-gray-400 mb-3 pl-1">
                            {style.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {items.map((skill) => {
                              const Icon = getIcon(skill.icon_name);
                              return (
                                <div
                                  key={skill.id}
                                  className="group/pill flex items-center gap-1.5 px-3 py-1.5 text-xs md:text-sm font-semibold rounded-lg border border-gray-200/80 dark:border-gray-700/60 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:scale-105 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:text-indigo-700 dark:hover:text-indigo-300 hover:shadow-md transition-all duration-300 cursor-default"
                                >
                                  {Icon && (
                                    <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400 dark:text-gray-500 group-hover/pill:text-indigo-500 dark:group-hover/pill:text-indigo-400 transition-colors" />
                                  )}
                                  <span className="truncate">{skill.name}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>


          </>
        )}
      </div>
    </section>
  );
}