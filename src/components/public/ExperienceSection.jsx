import { useEffect, useRef, useState } from 'react';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { SkeletonTimeline } from '../ui/SkeletonLoader';
import { usePortfolio } from '../../hooks/usePortfolio';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function TimelineItem({ experience, index }) {
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
      className={`relative flex gap-6 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Timeline Line & Dot */}
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/30 mt-1.5 z-10 flex-shrink-0" />
        <div className="w-0.5 flex-1 bg-gray-200 dark:bg-gray-800 mt-2" />
      </div>

      {/* Content Card */}
      <div className="flex-1 pb-10">
        <div className="p-6 rounded-2xl bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {experience.role}
              </h3>
              <div className="flex items-center gap-2 text-indigo-500 font-semibold text-sm mt-1">
                <Briefcase className="w-3.5 h-3.5" />
                {experience.company}
              </div>
            </div>
            {experience.is_current && (
              <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-full shadow-sm">
                Present
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
            {experience.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {experience.location}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(experience.start_date)} — {experience.is_current ? 'Present' : formatDate(experience.end_date)}
            </span>
          </div>

          {experience.description && (
            <div className="flex flex-col flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">
                {isExpanded || !isLongDescription
                  ? experience.description
                  : getTruncatedText(experience.description, characterLimit)}
              </p>
              {isLongDescription && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-2 text-xs font-bold text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors self-start"
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
    <section id="experience" className="py-20 md:py-28 px-4 bg-gray-50/50 dark:bg-[#0d0d14]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            My professional journey and contributions.
          </p>
        </div>

        {loading ? (
          <SkeletonTimeline items={3} />
        ) : experiences && experiences.length > 0 ? (
          <div>
            {experiences.map((exp, index) => (
              <TimelineItem key={exp.id} experience={exp} index={index} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">No experience entries yet.</p>
        )}
      </div>
    </section>
  );
}
