import { MapPin, Download, Mail, ArrowDown, Sparkles, MessageCircle } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from '../ui/BrandIcons';
import { SkeletonText, SkeletonAvatar } from '../ui/SkeletonLoader';
import { usePortfolio } from '../../hooks/usePortfolio';
import { getSocialUrl } from '../../utils/social';

export default function HeroSection() {
  const { profile, loading } = usePortfolio();

  if (loading) {
    return (
      <section id="hero" className="min-h-screen flex items-center justify-center pt-36 pb-16 px-4">
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
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-36 md:pt-40 pb-16 px-4 overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle Grid Pattern for a "Tech" feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Animated Glowing Orbs */}
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-[100px] animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center animate-slide-up z-10">

        {/* Avatar with Concentric Gradient Rings */}
        {profile.avatar_url && (
          <div className="mb-6 flex justify-center">
            <div className="relative group">
              {/* Spinning outer gradients */}
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 rounded-full blur-lg opacity-40 group-hover:opacity-75 transition-opacity duration-500 group-hover:animate-spin-slow" />
              <div className="absolute -inset-0.5 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <img
                src={profile.avatar_url}
                alt={profile.full_name}
                className="relative w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border-[3px] border-white dark:border-gray-900 shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        )}

        {/* Name with Original Purple (Light) and Shining Gold (Dark) - Professional Sizing */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
          <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-700 dark:from-amber-300 dark:via-yellow-400 dark:to-amber-500 bg-clip-text text-transparent">
            {profile.full_name}
          </span>
        </h1>

        {/* Headline with Professional Slate/Charcoal Color */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <Sparkles className="w-4 h-4 text-amber-500/70 animate-pulse hidden sm:block" />
          <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-700 dark:text-slate-300 tracking-wide">
            {profile.headline}
          </p>
          <Sparkles className="w-4 h-4 text-amber-500/70 animate-pulse hidden sm:block" />
        </div>

        {/* Location */}
        {profile.location && (
          <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 mb-8 bg-white/50 dark:bg-gray-800/50 w-max mx-auto px-4 py-1.5 rounded-full backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            <MapPin className="w-4 h-4 text-indigo-500" />
            <span className="text-sm font-medium">{profile.location}</span>
          </div>
        )}

        {/* Bio - Readable Sizing */}
        {profile.bio && (
          <p className="text-gray-600 dark:text-gray-300/90 max-w-2xl mx-auto mb-10 text-base sm:text-lg leading-relaxed whitespace-pre-wrap font-medium px-4">
            {profile.bio}
          </p>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mb-16">
          {profile.resume_url && (
            <a
              href={profile.resume_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.12)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              {/* Shine effect on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-black/10 to-transparent skew-x-12" />
              <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
              <span>Download Resume</span>
            </a>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3">
            {profile.github_url && (
              <a
                href={getSocialUrl(profile.github_url, 'github')}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-gray-700/80 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 rounded-2xl px-6 py-3.5 font-bold shadow-sm hover:shadow-md hover:-translate-y-1"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                GitHub
              </a>
            )}
            {profile.linkedin_url && (
              <a
                href={getSocialUrl(profile.linkedin_url, 'linkedin')}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-gray-700/80 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 rounded-2xl px-6 py-3.5 font-bold shadow-sm hover:shadow-md hover:-translate-y-1"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                LinkedIn
              </a>
            )}
            {/* WhatsApp Button */}
            <a
              href={getSocialUrl(profile.whatsapp_url, 'whatsapp')}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-gray-700/80 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 rounded-2xl px-6 py-3.5 font-bold shadow-sm hover:shadow-md hover:-translate-y-1"
            >
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 text-emerald-500" />
              WhatsApp
            </a>
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-2 bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-gray-700/80 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-purple-500/50 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 rounded-2xl px-6 py-3.5 font-bold shadow-sm hover:shadow-md hover:-translate-y-1"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
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
          className="group inline-flex flex-col items-center gap-3 text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors mt-4"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] group-hover:tracking-[0.3em] transition-all duration-300">
            Scroll to explore
          </span>
          <div className="w-8 h-12 rounded-full border-2 border-gray-300 dark:border-gray-700 flex justify-center p-1 group-hover:border-indigo-500 dark:group-hover:border-indigo-400 transition-colors">
            <div className="w-1.5 h-3 bg-gray-400 group-hover:bg-indigo-500 dark:group-hover:bg-indigo-400 rounded-full animate-bounce mt-1 transition-colors" />
          </div>
        </a>
      </div>
    </section>
  );
}