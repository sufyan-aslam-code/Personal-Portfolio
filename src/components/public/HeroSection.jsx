import { MapPin, Download, Mail, ArrowDown } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from '../ui/BrandIcons';
import { SkeletonText, SkeletonAvatar } from '../ui/SkeletonLoader';
import { usePortfolio } from '../../hooks/usePortfolio';
import { getSocialUrl } from '../../utils/social';

export default function HeroSection() {
  const { profile, loading } = usePortfolio();

  if (loading) {
    return (
      <section id="hero" className="min-h-screen flex items-center justify-center pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <SkeletonAvatar size="xl" className="mx-auto mb-6" />
          <div className="skeleton h-10 w-64 mx-auto mb-4" />
          <div className="skeleton h-6 w-96 mx-auto mb-6" />
          <SkeletonText lines={3} className="max-w-lg mx-auto" />
        </div>
      </section>
    );
  }

  if (!profile) return null;

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center animate-slide-up">
        {/* Avatar */}
        {profile.avatar_url && (
          <div className="mb-8 inline-block">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              <img
                src={profile.avatar_url}
                alt={profile.full_name}
                className="relative w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-900 shadow-2xl"
              />
            </div>
          </div>
        )}


        {/* Name */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4">
          <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-700 bg-clip-text text-transparent dark:bg-gradient-to-r dark:from-amber-300 dark:via-yellow-400 dark:to-amber-500 dark:bg-clip-text dark:text-transparent">
            {profile.full_name}
          </span>
        </h1>

        {/* Headline */}
        <p className="text-lg sm:text-xl md:text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-blue-500">
          {profile.headline}
        </p>

        {/* Location */}
        {profile.location && (
          <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 mb-6">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{profile.location}</span>
          </div>
        )}

        {/* Bio */}
        {profile.bio && (
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed whitespace-pre-wrap">
            {profile.bio}
          </p>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mb-10">
          {profile.resume_url && (
            <a
              href={profile.resume_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          )}
          
          <div className="flex flex-wrap items-center justify-center gap-3">
            {profile.github_url && (
              <a
                href={getSocialUrl(profile.github_url, 'github')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-900/60 backdrop-blur-md border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 rounded-xl px-5 py-3 font-semibold"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
            {profile.linkedin_url && (
              <a
                href={getSocialUrl(profile.linkedin_url, 'linkedin')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-900/60 backdrop-blur-md border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 rounded-xl px-5 py-3 font-semibold"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            )}
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-900/60 backdrop-blur-md border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 rounded-xl px-5 py-3 font-semibold"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#skills"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex flex-col items-center gap-2 text-gray-400 hover:text-indigo-500 transition-colors animate-bounce"
        >
          <span className="text-xs font-medium uppercase tracking-widest">Explore</span>
          <ArrowDown className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
