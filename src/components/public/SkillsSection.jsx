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
    text: 'text-pink-500 dark:text-pink-400',
    dot: 'bg-pink-500',
  },
  'Frontend': {
    text: 'text-blue-500 dark:text-blue-400',
    dot: 'bg-blue-500',
  },
  'Backend': {
    text: 'text-emerald-500 dark:text-emerald-400',
    dot: 'bg-emerald-500',
  },
  'Databases': {
    text: 'text-orange-500 dark:text-orange-400',
    dot: 'bg-orange-500',
  },
  'AI & Data': {
    text: 'text-violet-500 dark:text-violet-400',
    dot: 'bg-violet-500',
  },
  'Tools': {
    text: 'text-amber-500 dark:text-amber-400',
    dot: 'bg-amber-500',
  },
  'Platforms': {
    text: 'text-cyan-500 dark:text-cyan-400',
    dot: 'bg-cyan-500',
  },
  'Soft Skills': {
    text: 'text-teal-500 dark:text-teal-400',
    dot: 'bg-teal-500',
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
    <section id="skills" className="py-16 md:py-28 px-3 sm:px-4 bg-gray-50/50 dark:bg-[#0d0d14] relative">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            The programming languages, frameworks, and engineering tools I leverage to build scalable systems.
          </p>
          
          {/* Mobile Interaction Hint */}
          <div className="md:hidden mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50/50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-medium animate-pulse">
            <LucideIcons.Touchpad className="w-3.5 h-3.5" />
            <span>Tap categories to expand</span>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-36 bg-white dark:bg-[#1a1a2e] rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : Object.keys(groupedSkills).length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">No skills available to display right now.</p>
          </div>
        ) : (
          /* Grid Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {Object.entries(groupedSkills).map(([category, items]) => {
              const style = CATEGORY_STYLES[category] || CATEGORY_STYLES.Tools;
              const isOpen = openCategory === category;

              return (
                <div
                  key={category}
                  className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-200 dark:border-gray-800 p-3 sm:p-4 flex flex-col shadow-sm hover:shadow-md hover:border-indigo-500/40 transition-all duration-300"
                >
                  {/* Category Header (Toggle on Mobile) */}
                  <div 
                    onClick={() => setOpenCategory(isOpen ? null : category)}
                    className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800/50 cursor-pointer md:cursor-default"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${style.dot} shadow-sm shrink-0`} />
                      <h3 className={`text-xs sm:text-sm font-bold tracking-wider uppercase truncate ${style.text}`}>
                        {category}
                      </h3>
                    </div>
                    {/* Accordion Chevron - Mobile Only */}
                    <LucideIcons.ChevronDown 
                      className={`w-4 h-4 text-gray-400 md:hidden transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                    />
                  </div>

                  {/* Skills Pill Cloud (Accordion Content on Mobile) */}
                  <div 
                    className={`grid transition-all duration-300 ease-in-out md:grid-rows-[1fr] md:opacity-100 md:mt-2 ${
                      isOpen ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 mt-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {items.map((skill) => {
                          const Icon = getIcon(skill.icon_name);
                          return (
                            <div
                              key={skill.id}
                              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg border border-gray-200/60 dark:border-gray-700/40 bg-gray-50/50 dark:bg-gray-900/40 text-gray-800 dark:text-gray-200 w-fit hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 cursor-default"
                            >
                              {Icon && <Icon className="w-3.5 h-3.5 opacity-70 shrink-0" />}
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