import { useState } from 'react';
import { ExternalLink, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { GithubIcon as Github } from '../ui/BrandIcons';
import { SkeletonCard } from '../ui/SkeletonLoader';
import { usePortfolio } from '../../hooks/usePortfolio';

export default function ProjectsSection() {
  const { projects, loading } = usePortfolio();
  const [showAll, setShowAll] = useState(false);

  // Set to 4 to match the new 4-column layout
  const INITIAL_COUNT = 4;

  const displayedProjects = showAll
    ? projects
    : projects?.slice(0, INITIAL_COUNT);

  const hasMore = projects?.length > INITIAL_COUNT;

  return (
    <section id="projects" className="py-20 md:py-28 px-4 scroll-mt-20 relative overflow-hidden bg-gray-50/30 dark:bg-[#0a0a0f]">
      
      {/* Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -left-1/4 w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">

        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50/80 dark:bg-indigo-500/10 border border-indigo-100/50 dark:border-indigo-500/20 backdrop-blur-md mb-3 shadow-sm">
            <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 tracking-wider uppercase">
              Portfolio
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black mb-3 tracking-tight">
            Featured <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            A curated selection of systems and applications that showcase my engineering capabilities.
          </p>
        </div>

        {/* Expandable Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : projects && projects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
              {displayedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {/* Show More / Show Less Button */}
            {hasMore && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-[#12121a] hover:bg-indigo-50 dark:hover:bg-indigo-500/10 border border-gray-200 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-500/30 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-bold shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-300 ease-out"
                >
                  {showAll ? (
                    <>
                      Show Less
                      <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
                    </>
                  ) : (
                    <>
                      View All {projects.length} Projects
                      <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-white/60 dark:border-gray-800/80 shadow-lg max-w-2xl mx-auto">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">No projects to display yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const characterLimit = 90;
  const isLongDescription = project.description && project.description.length > characterLimit;

  return (
    <div
      className={`group relative flex flex-col rounded-2xl overflow-hidden bg-white/70 dark:bg-[#12121a]/80 backdrop-blur-xl border transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl ${
        project.is_featured
          ? 'border-amber-500/40 dark:border-amber-500/40 shadow-[0_4px_20px_rgba(245,158,11,0.08)] dark:shadow-[0_4px_20px_rgba(245,158,11,0.12)]'
          : 'border-white/60 dark:border-gray-800/60 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 shadow-sm'
      }`}
    >
      {/* Featured Badge */}
      {project.is_featured && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-[0_4px_15px_rgba(245,158,11,0.4)] border border-amber-300/50 backdrop-blur-md">
          <Star className="w-3 h-3 fill-white text-white drop-shadow-md" />
          <span className="drop-shadow-md">Featured</span>
        </div>
      )}

      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden shrink-0 border-b border-gray-100 dark:border-gray-800/80 bg-gray-50/50 dark:bg-black/30 flex items-center justify-center p-3">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center rounded-lg">
            <span className="text-3xl opacity-20">💻</span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Title Space (Fixed min-height for 2 lines) */}
        <div className="min-h-[48px] mb-2">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 line-clamp-2 leading-tight">
            {project.title}
          </h3>
        </div>

        {/* Description Space (Reserved slot for ~2-3 lines + button to keep alignment strict) */}
        <div className="mb-4 min-h-[64px]">
          {project.description && (
            <div className="h-full flex flex-col">
              <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap transition-all duration-300">
                {isExpanded || !isLongDescription
                  ? project.description
                  : `${project.description.slice(0, characterLimit)}...`}
              </p>
              {isLongDescription && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-1.5 text-[10px] font-bold uppercase tracking-wider text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors flex items-center gap-1 w-fit"
                >
                  {isExpanded ? 'Read Less' : 'Read More'}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Tech Stack Tags */}
        <div className="mt-auto mb-4">
          {project.tech_stack && project.tech_stack.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.tech_stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-[10px] font-bold tracking-wide bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 rounded border border-gray-200/60 dark:border-gray-700/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="flex items-center gap-2.5">
          {project.live_link && (
            <a
              href={project.live_link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/live flex-1 flex items-center justify-center gap-1.5 py-2 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20 text-xs font-bold rounded-lg transition-all duration-300"
            >
              <ExternalLink className="w-3.5 h-3.5 group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5 transition-transform duration-300" />
              Live
            </a>
          )}
          {project.github_link && (
            <a
              href={project.github_link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/source flex-1 flex items-center justify-center gap-1.5 py-2 bg-white hover:bg-gray-50 dark:bg-[#1a1a2e] dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 text-xs font-bold rounded-lg transition-all duration-300"
            >
              <Github className="w-3.5 h-3.5 group-hover/source:scale-110 transition-transform duration-300" />
              Source
            </a>
          )}
        </div>
      </div>
    </div>
  );
}