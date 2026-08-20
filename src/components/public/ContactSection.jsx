import { Mail, Heart, ArrowUp } from 'lucide-react';
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
    <section id="contact" className="relative py-20 md:py-28 px-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            I'm always open to discussing new opportunities, interesting projects, or just having a friendly chat.
          </p>
        </div>

        {/* Social Links Container */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          
          {/* PRIMARY CONTACTS (Full width on mobile, auto width on md) */}
          {profile?.email && (
            <a
              href={`mailto:${profile.email}`}
              className="w-full md:w-auto group flex items-center gap-4 p-4 md:p-5 rounded-2xl bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white group-hover:scale-110 transition-transform duration-300 shadow-sm shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex flex-col text-left overflow-hidden pr-2">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-0.5">Email</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
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
              className="w-full md:w-auto group flex items-center gap-4 p-4 md:p-5 rounded-2xl bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-3 rounded-xl bg-[#25D366] text-white group-hover:scale-110 transition-transform duration-300 shadow-sm shrink-0">
                <Whatsapp className="w-6 h-6" />
              </div>
              <div className="flex flex-col text-left overflow-hidden pr-2">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-0.5">WhatsApp</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  Message Me
                </p>
              </div>
            </a>
          )}

          {/* SOCIAL CONTACTS (Circular on mobile, horizontal cards on md) */}
          {profile?.github_url && (
            <a
              href={getSocialUrl(profile.github_url, 'github')}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center md:gap-4 p-2 md:p-5 rounded-full md:rounded-2xl bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-3 rounded-full md:rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 group-hover:scale-110 transition-transform duration-300 shadow-sm shrink-0">
                <Github className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="hidden md:flex flex-col text-left overflow-hidden pr-2">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-0.5">GitHub</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
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
              className="group flex items-center md:gap-4 p-2 md:p-5 rounded-full md:rounded-2xl bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-3 rounded-full md:rounded-xl bg-[#0A66C2] text-white group-hover:scale-110 transition-transform duration-300 shadow-sm shrink-0">
                <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="hidden md:flex flex-col text-left overflow-hidden pr-2">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-0.5">LinkedIn</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
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
              className="group flex items-center md:gap-4 p-2 md:p-5 rounded-full md:rounded-2xl bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-3 rounded-full md:rounded-xl bg-black dark:bg-white text-white dark:text-black group-hover:scale-110 transition-transform duration-300 shadow-sm shrink-0">
                <TwitterX className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="hidden md:flex flex-col text-left overflow-hidden pr-2">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-0.5">X (Twitter)</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
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
              className="group flex items-center md:gap-4 p-2 md:p-5 rounded-full md:rounded-2xl bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-3 rounded-full md:rounded-xl bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white group-hover:scale-110 transition-transform duration-300 shadow-sm shrink-0">
                <Instagram className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="hidden md:flex flex-col text-left overflow-hidden pr-2">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-0.5">Instagram</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
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
              className="group flex items-center md:gap-4 p-2 md:p-5 rounded-full md:rounded-2xl bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-3 rounded-full md:rounded-xl bg-[#1877F2] text-white group-hover:scale-110 transition-transform duration-300 shadow-sm shrink-0">
                <Facebook className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="hidden md:flex flex-col text-left overflow-hidden pr-2">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-0.5">Facebook</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  View Profile
                </p>
              </div>
            </a>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 dark:bg-gray-800 max-w-md mx-auto mb-8" />

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400 flex items-center gap-1.5">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> by{' '}
            <span className="font-semibold text-gray-600 dark:text-gray-300">
              {profile?.full_name || 'Sufyan Aslam'}
            </span>
          </p>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-indigo-500/10 hover:text-indigo-500 transition-all duration-300"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
