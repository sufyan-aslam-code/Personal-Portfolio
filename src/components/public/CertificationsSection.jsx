import { useState } from 'react';
import { Award, ExternalLink, Calendar, Maximize, X, ChevronDown, ChevronUp } from 'lucide-react';
import { SkeletonBadge } from '../ui/SkeletonLoader';
import { usePortfolio } from '../../hooks/usePortfolio';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function CertificationsSection() {
  const { certifications, loading } = usePortfolio();
  const [selectedCert, setSelectedCert] = useState(null);

  // State to track if the grid is expanded
  const [showAll, setShowAll] = useState(false);
  const INITIAL_COUNT = 4; // Show 4 items initially

  // Determine which certificates to show based on state
  const displayedCerts = showAll
    ? certifications
    : certifications?.slice(0, INITIAL_COUNT);

  const hasMore = certifications?.length > INITIAL_COUNT;

  return (
    <section id="certifications" className="py-20 md:py-28 px-4 bg-gray-50/50 dark:bg-[#0d0d14] relative">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-12 relative">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Certifications</span> & Badges
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Professional certifications and verified credentials.
          </p>
        </div>

        {/* Expandable Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonBadge key={i} />
            ))}
          </div>
        ) : certifications && certifications.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedCerts.map((cert) => (
                <CertCard
                  key={cert.id}
                  cert={cert}
                  onImageClick={() => setSelectedCert(cert.badge_url)}
                />
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
                      View All {certifications.length} Credentials
                      <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-400 py-10 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
            No certifications to display yet.
          </p>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 transition-opacity duration-300"
          onClick={() => setSelectedCert(null)}
        >
          <button
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
            onClick={(e) => { e.stopPropagation(); setSelectedCert(null); }}
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedCert}
            alt="Certificate Preview"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

function CertCard({ cert, onImageClick }) {
  return (
    <div className="group flex flex-col p-5 rounded-2xl bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300 min-h-[380px]">

      {/* Image Section */}
      <div
        className="relative w-full h-40 mb-4 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900 flex items-center justify-center cursor-pointer border border-gray-100 dark:border-gray-800 shrink-0"
        onClick={cert.badge_url ? onImageClick : undefined}
      >
        {cert.badge_url ? (
          <>
            <img
              src={cert.badge_url}
              alt={cert.title}
              className="w-full h-full object-contain p-3"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                <Maximize className="w-6 h-6" />
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-indigo-500/5 flex items-center justify-center">
            <Award className="w-10 h-10 text-indigo-500/50" />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 text-left flex flex-col">
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">
          {cert.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          {cert.issuer}
        </p>

        <div className="mt-auto pt-4">
          {cert.issue_date && (
            <span className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
              <Calendar className="w-3.5 h-3.5" />
              Issued {formatDate(cert.issue_date)}
            </span>
          )}

          {/* Action Button */}
          {cert.credential_url ? (
            <a
              href={cert.credential_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-indigo-500 hover:border-indigo-500 hover:text-white transition-all duration-300"
            >
              Show Credential
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <div className="w-full py-2.5 h-[42px]"></div>
          )}
        </div>
      </div>
    </div>
  );
}