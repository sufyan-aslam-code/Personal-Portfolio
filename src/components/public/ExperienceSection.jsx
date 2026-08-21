import { useEffect, useRef, useState } from 'react';
import { Briefcase, MapPin, Calendar, Compass } from 'lucide-react';
import { SkeletonTimeline } from '../ui/SkeletonLoader';
import { usePortfolio } from '../../hooks/usePortfolio';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function TimelineItem({ experience, index, isLast }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Responsive Truncation Logic
  const [isExpanded, setIsExpanded] = useState(false);
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const characterLimit = width < 640 ? 100 : width < 1024 ? 150 : 200;
  const isLongDescription = experience.description && experience.description.length > characterLimit;

  // Smart truncate to avoid cutting words in half
  const getTruncatedText = (text, limit) => {
    if (!text || text.length <= limit) return text;
    const sliced = text.slice(0, limit);
    const lastSpace = sliced.lastIndexOf(' ');
    return lastSpace > 0 ? sliced.slice(0, lastSpace) + '...' : sliced + '...';
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group relative flex gap-3 sm:gap-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Premium Timeline Line & Dot */}
      <div className="flex flex-col items-center mt-2">
        <div className="relative flex items-center justify-center w-5 h-5">
          {experience.is_current && (
            <div className="absolute inset-0 rounded-full bg-indigo-500 opacity-20 animate-ping" />
          )}
          <div className={`relative w-3 h-3 rounded-full z-10 transition-colors duration-300 ${experience.is_current
              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]'
              : 'bg-gray-300 dark:bg-gray-700 group-hover:bg-indigo-400'
            }`} />
        </div>
        {!isLast && (
          <div className="w-[2px] flex-1 bg-gradient-to-b from-indigo-500/20 via-gray-200 to-gray-200 dark:from-indigo-500/20 dark:via-gray-800 dark:to-gray-800 mt-1 rounded-full group-hover:from-indigo-500/40 transition-colors duration-500" />
        )}
      </div>

      {/* Content Card (Glassmorphism) */}
      <div className="flex-1 pb-6 sm:pb-8">
        <div className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-[#12121a]/70 backdrop-blur-xl border border-white/60 dark:border-gray-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-xl hover:border-indigo-500/30 hover:-translate-y-1 transition-all duration-500 ease-out flex flex-col h-full relative overflow-hidden">

          {/* Subtle hover gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative z-10 flex flex-wrap items-start justify-between gap-2 mb-3">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {experience.role}
              </h3>
              <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold text-sm mt-1">
                <Briefcase className="w-3.5 h-3.5" />
                {experience.company}
              </div>
            </div>

            {experience.is_current && (
              <span className="px-3 py-1 text-[10px] sm:text-xs font-black bg-gradient-to-r from-indigo-500 to-purple-500 text-white uppercase tracking-wider rounded-full shadow-sm">
                Present
              </span>
            )}
          </div>

          {/* Metadata Pills */}
          <div className="relative z-10 flex flex-wrap gap-2 mb-3">
            {experience.location && (
              <span className="flex items-center gap-1 px-2.5 py-1 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-md text-[11px] sm:text-xs font-bold border border-gray-200/50 dark:border-gray-700/50">
                <MapPin className="w-3 h-3 text-indigo-500" />
                {experience.location}
              </span>
            )}
            <span className="flex items-center gap-1 px-2.5 py-1 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-md text-[11px] sm:text-xs font-bold border border-gray-200/50 dark:border-gray-700/50">
              <Calendar className="w-3 h-3 text-indigo-500" />
              {formatDate(experience.start_date)} — {experience.is_current ? 'Present' : formatDate(experience.end_date)}
            </span>
          </div>

          {/* Description Area */}
          {experience.description && (
            <div className="relative z-10 flex flex-col flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-400/90 leading-relaxed whitespace-pre-wrap font-medium">
                {isExpanded || !isLongDescription
                  ? experience.description
                  : getTruncatedText(experience.description, characterLimit)}
              </p>
              {isLongDescription && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-2 text-[11px] sm:text-xs font-bold text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors self-start uppercase tracking-wider"
                >
                  {isExpanded ? 'Read Less' : 'Read More'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const { experiences, loading } = usePortfolio();

  return (
    <section id="experience" className="py-16 md:py-24 px-4 relative overflow-hidden bg-gray-50/50 dark:bg-[#0a0a0f]">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle Tech Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Ambient Glowing Orbs */}
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-4xl mx-auto z-10">

        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-indigo-50/80 dark:bg-indigo-500/10 border border-indigo-100/50 dark:border-indigo-500/20 backdrop-blur-md mb-4 shadow-sm">
            <Compass className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300 tracking-wider uppercase">
              Career Journey
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight">
            <span className="text-gray-900 dark:text-white">Work </span>
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            My professional journey and the organizations I've collaborated with to build impactful solutions.
          </p>
        </div>

        {/* Timeline Container */}
        {loading ? (
          <SkeletonTimeline items={3} />
        ) : experiences && experiences.length > 0 ? (
          <div className="pl-1 sm:pl-0">
            {experiences.map((exp, index) => (
              <TimelineItem
                key={exp.id}
                experience={exp}
                index={index}
                isLast={index === experiences.length - 1}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-white/60 dark:border-gray-800/80 shadow-lg max-w-2xl mx-auto">
            <p className="text-base text-gray-500 dark:text-gray-400 font-medium">No experience entries to display yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}