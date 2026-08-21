import { useState } from 'react';
import { ExternalLink, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { GithubIcon as Github } from '../ui/BrandIcons';
import { SkeletonCard } from '../ui/SkeletonLoader';
import { usePortfolio } from '../../hooks/usePortfolio';

export default function ProjectsSection() {
  const { projects, loading } = usePortfolio();

  // State to track if the grid is expanded
  const [showAll, setShowAll] = useState(false);

  // Set to 4 to match the xl:grid-cols-4 layout
  const INITIAL_COUNT = 4;

  // Determine which projects to show based on state
  const displayedProjects = showAll
    ? projects
    : projects?.slice(0, INITIAL_COUNT);

  const hasMore = projects?.length > INITIAL_COUNT;

  return (
    <section id="projects" className="py-20 md:py-28 px-4">
      {/* Expanded to max-w-7xl to comfortably fit 4 cards */}
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            A curated selection of projects that showcase my skills and creativity.
          </p>
        </div>

        {/* Expandable Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : projects && projects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {/* Show More / Show Less Button */}
            {hasMore && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold shadow-sm hover:shadow-indigo-500/25 transition-all duration-300"
                >
                  {showAll ? (
                    <>
                      Show Less
                      <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                    </>
                  ) : (
                    <>
                      View All {projects.length} Projects
                      <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-400 py-10 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
            No projects to display yet.
          </p>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  // Logic for the Read More / Read Less description toggle
  const [isExpanded, setIsExpanded] = useState(false);
  const characterLimit = 130;
  const isLongDescription = project.description && project.description.length > characterLimit;

  return (
    <div
      className={`group relative flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-[#1a1a2e] border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${project.is_featured
        ? 'border-indigo-500/40 shadow-lg shadow-indigo-500/10'
        : 'border-gray-200 dark:border-gray-800 hover:shadow-indigo-500/5'
        }`}
    >
      {/* Featured Badge */}
      {project.is_featured && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
          <Star className="w-3.5 h-3.5" fill="currentColor" />
          <span className="hidden sm:inline">Featured</span>
        </div>
      )}

      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden shrink-0 border-b border-gray-100 dark:border-gray-800">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-surface-800 dark:to-surface-900 flex items-center justify-center">
            <span className="text-4xl opacity-20">💻</span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-500 transition-colors line-clamp-2">
          {project.title}
        </h3>

        {/* Expandable Formatted Description */}
        {project.description && (
          <div className="mb-5">
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap transition-all duration-300">
              {isExpanded || !isLongDescription
                ? project.description
                : `${project.description.slice(0, characterLimit)}...`}
            </p>
            {isLongDescription && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-xs font-bold text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
              >
                {isExpanded ? 'Read Less' : 'Read More'}
              </button>
            )}
          </div>
        )}

        {/* Tech Stack Tags */}
        <div className="mt-auto">
          {project.tech_stack && project.tech_stack.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md border border-gray-200 dark:border-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-5 pt-0 mt-2 flex items-center gap-3">
        {project.live_link && (
          <a
            href={project.live_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-bold rounded-xl transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Live
          </a>
        )}
        {project.github_link && (
          <a
            href={project.github_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-bold rounded-xl transition-colors"
          >
            <Github className="w-4 h-4" />
            Source
          </a>
        )}
      </div>
    </div>
  );
}