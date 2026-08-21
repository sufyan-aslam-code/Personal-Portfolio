import { useState } from 'react';
import { Award, ExternalLink, Calendar, Maximize, X, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
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

  const [showAll, setShowAll] = useState(false);
  const INITIAL_COUNT = 4;

  const displayedCerts = showAll
    ? certifications
    : certifications?.slice(0, INITIAL_COUNT);

  const hasMore = certifications?.length > INITIAL_COUNT;

  return (
    <section id="certifications" className="py-16 md:py-24 px-4 relative overflow-hidden bg-gray-50/80 dark:bg-[#0a0a0f]">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="absolute top-1/4 -right-32 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -left-32 w-[600px] h-[600px] bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">

        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-indigo-500/10 border border-gray-200 dark:border-indigo-500/20 shadow-sm mb-4">
            <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300 tracking-wider uppercase">
              Verified Credentials
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight">
            <span className="text-gray-900 dark:text-white">Certifications & </span>
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Badges
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            Professional certifications, continuous learning, and verified technical credentials.
          </p>
        </div>

        {/* Expandable Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonBadge key={i} />
            ))}
          </div>
        ) : certifications && certifications.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-stretch">
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
                  className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white dark:bg-[#12121a]/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800/80 text-gray-900 dark:text-white font-bold shadow-sm hover:shadow-md hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="relative z-10">
                    {showAll ? 'Show Less' : `View All ${certifications.length} Credentials`}
                  </span>
                  <div className="relative z-10 w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-indigo-500 flex items-center justify-center transition-colors duration-300">
                    {showAll ? (
                      <ChevronUp className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors" />
                    )}
                  </div>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-gray-900/40 rounded-3xl border border-gray-200 dark:border-gray-800/80 shadow-sm max-w-2xl mx-auto">
            <p className="text-base text-gray-500 dark:text-gray-400 font-medium">No certifications to display yet.</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 dark:bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 transition-opacity duration-300"
          onClick={() => setSelectedCert(null)}
        >
          <button
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full transition-colors backdrop-blur-md"
            onClick={(e) => { e.stopPropagation(); setSelectedCert(null); }}
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedCert}
            alt="Certificate Preview"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

function CertCard({ cert, onImageClick }) {
  return (
    <div className="group relative flex flex-col h-full p-4 rounded-3xl bg-white dark:bg-[#12121a]/80 backdrop-blur-xl border hover:-translate-y-1.5 transition-all duration-500 ease-out border-gray-200 dark:border-gray-800 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:border-indigo-500/30">

      {/* Image Section */}
      <div
        className="relative w-full h-40 mb-4 rounded-2xl overflow-hidden bg-gray-50 dark:bg-[#0a0a0f] flex items-center justify-center cursor-pointer border border-gray-100 dark:border-gray-800/50 shrink-0 group/img"
        onClick={cert.badge_url ? onImageClick : undefined}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent z-10 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500" />

        {cert.badge_url ? (
          <>
            <img
              src={cert.badge_url}
              alt={cert.title}
              className="w-full h-full object-contain p-4 transition-transform duration-700 ease-out group-hover/img:scale-110"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
              <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white scale-75 group-hover/img:scale-100 transition-transform duration-300 shadow-lg border border-white/30">
                <Maximize className="w-5 h-5" />
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Award className="w-10 h-10 text-gray-300 dark:text-gray-700" />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 text-left flex flex-col">
        <h3 className="text-lg font-black text-gray-900 dark:text-white mb-1.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
          {cert.title}
        </h3>
        <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-3 line-clamp-1">
          {cert.issuer}
        </p>

        {/* Bottom Area (Pinned) */}
        <div className="mt-auto pt-2">
          {/* Simple, clean issued date */}
          {cert.issue_date && (
            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-xs font-semibold mb-4">
              <Calendar className="w-3.5 h-3.5 text-indigo-500" />
              Issued {formatDate(cert.issue_date)}
            </div>
          )}

          {/* Upgraded Action Button */}
          {cert.credential_url ? (
            <a
              href={cert.credential_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn w-full py-2.5 px-4 rounded-xl bg-gray-50 hover:bg-indigo-500 dark:bg-gray-800/50 dark:hover:bg-indigo-500 border border-gray-200 dark:border-gray-700 hover:border-transparent text-gray-700 dark:text-gray-300 hover:text-white text-sm font-bold shadow-sm hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2"
            >
              Verify Credential
              <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover/btn:text-white group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-all duration-300" />
            </a>
          ) : (
            <div className="w-full py-2.5 h-[42px]"></div>
          )}
        </div>
      </div>
    </div>
  );
}