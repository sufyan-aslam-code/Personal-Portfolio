import { Mail, ArrowUp, MessageSquare } from 'lucide-react';
import {
  GithubIcon as Github,
  LinkedinIcon as Linkedin,
  WhatsappIcon as Whatsapp,
  TwitterXIcon as TwitterX,
  InstagramIcon as Instagram,
  FacebookIcon as Facebook,
} from '../ui/BrandIcons';
import { usePortfolio } from '../../hooks/usePortfolio';
import { getSocialUrl } from '../../utils/social';

export default function ContactSection() {
  const { profile } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-4 relative overflow-hidden bg-gray-50/50 dark:bg-[#0a0a0f]">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle Tech Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Ambient Glowing Orb */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center z-10">

        {/* Header Section */}
        <div className="mb-10">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-indigo-50/80 dark:bg-indigo-500/10 border border-indigo-100/50 dark:border-indigo-500/20 backdrop-blur-md mb-4 shadow-sm">
            <MessageSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300 tracking-wider uppercase">
              Get In Touch
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight">
            <span className="text-gray-900 dark:text-white">Let's </span>
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto font-medium">
            I'm always open to discussing new opportunities, interesting projects, or just having a friendly chat.
          </p>
        </div>

        {/* Social Links Container */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">

          {/* PRIMARY CONTACTS */}
          {profile?.email && (
            <a
              href={`mailto:${profile.email}`}
              className="w-full sm:w-auto group flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-white/70 dark:bg-[#12121a]/70 backdrop-blur-xl border border-white/60 dark:border-gray-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-xl hover:border-indigo-500/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white group-hover:scale-110 transition-transform duration-300 shadow-sm shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left overflow-hidden pr-2">
                <p className="text-[11px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-0.5">Email</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                  {profile.email}
                </p>
              </div>
            </a>
          )}

          {profile?.whatsapp_url && (
            <a
              href={getSocialUrl(profile.whatsapp_url, 'whatsapp')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto group flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-white/70 dark:bg-[#12121a]/70 backdrop-blur-xl border border-white/60 dark:border-gray-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-xl hover:border-green-500/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-2.5 rounded-xl bg-[#25D366] text-white group-hover:scale-110 transition-transform duration-300 shadow-sm shrink-0">
                <Whatsapp className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left overflow-hidden pr-2">
                <p className="text-[11px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-0.5">WhatsApp</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                  Message Me
                </p>
              </div>
            </a>
          )}

          {/* SOCIAL CONTACTS */}
          {profile?.github_url && (
            <a
              href={getSocialUrl(profile.github_url, 'github')}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center md:gap-3 p-2.5 md:p-4 rounded-full md:rounded-2xl bg-white/70 dark:bg-[#12121a]/70 backdrop-blur-xl border border-white/60 dark:border-gray-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-xl hover:border-gray-400/50 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-2.5 rounded-full md:rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 group-hover:scale-110 transition-transform duration-300 shadow-sm shrink-0">
                <Github className="w-5 h-5" />
              </div>
              <div className="hidden md:flex flex-col text-left overflow-hidden pr-2">
                <p className="text-[11px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-0.5">GitHub</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                  View Projects
                </p>
              </div>
            </a>
          )}

          {profile?.linkedin_url && (
            <a
              href={getSocialUrl(profile.linkedin_url, 'linkedin')}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center md:gap-3 p-2.5 md:p-4 rounded-full md:rounded-2xl bg-white/70 dark:bg-[#12121a]/70 backdrop-blur-xl border border-white/60 dark:border-gray-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-xl hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-2.5 rounded-full md:rounded-xl bg-[#0A66C2] text-white group-hover:scale-110 transition-transform duration-300 shadow-sm shrink-0">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="hidden md:flex flex-col text-left overflow-hidden pr-2">
                <p className="text-[11px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-0.5">LinkedIn</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                  Let's Connect
                </p>
              </div>
            </a>
          )}

          {profile?.twitter_url && (
            <a
              href={getSocialUrl(profile.twitter_url, 'twitter')}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center md:gap-3 p-2.5 md:p-4 rounded-full md:rounded-2xl bg-white/70 dark:bg-[#12121a]/70 backdrop-blur-xl border border-white/60 dark:border-gray-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-xl hover:border-gray-400/50 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-2.5 rounded-full md:rounded-xl bg-black dark:bg-white text-white dark:text-black group-hover:scale-110 transition-transform duration-300 shadow-sm shrink-0">
                <TwitterX className="w-5 h-5" />
              </div>
              <div className="hidden md:flex flex-col text-left overflow-hidden pr-2">
                <p className="text-[11px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-0.5">X (Twitter)</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                  Follow Me
                </p>
              </div>
            </a>
          )}

          {profile?.instagram_url && (
            <a
              href={getSocialUrl(profile.instagram_url, 'instagram')}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center md:gap-3 p-2.5 md:p-4 rounded-full md:rounded-2xl bg-white/70 dark:bg-[#12121a]/70 backdrop-blur-xl border border-white/60 dark:border-gray-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-xl hover:border-pink-500/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-2.5 rounded-full md:rounded-xl bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white group-hover:scale-110 transition-transform duration-300 shadow-sm shrink-0">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="hidden md:flex flex-col text-left overflow-hidden pr-2">
                <p className="text-[11px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-0.5">Instagram</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                  Follow Me
                </p>
              </div>
            </a>
          )}

          {profile?.facebook_url && (
            <a
              href={getSocialUrl(profile.facebook_url, 'facebook')}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center md:gap-3 p-2.5 md:p-4 rounded-full md:rounded-2xl bg-white/70 dark:bg-[#12121a]/70 backdrop-blur-xl border border-white/60 dark:border-gray-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-xl hover:border-blue-400/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-2.5 rounded-full md:rounded-xl bg-[#1877F2] text-white group-hover:scale-110 transition-transform duration-300 shadow-sm shrink-0">
                <Facebook className="w-5 h-5" />
              </div>
              <div className="hidden md:flex flex-col text-left overflow-hidden pr-2">
                <p className="text-[11px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-0.5">Facebook</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                  View Profile
                </p>
              </div>
            </a>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200/50 dark:bg-gray-800/50 max-w-lg mx-auto mb-6" />

        {/* Clean Footer */}
        <div className="flex items-center justify-between gap-4 max-w-lg mx-auto">
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} {profile?.full_name || 'Sufyan Aslam'}.
          </p>
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-gray-500 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 shadow-sm"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}