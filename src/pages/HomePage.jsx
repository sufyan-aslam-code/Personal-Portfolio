import { useEffect, lazy, Suspense } from 'react';
import Navbar from '../components/public/Navbar';
import HeroSection from '../components/public/HeroSection';
import { usePortfolio } from '../hooks/usePortfolio';

// Lazy load sections below the fold for performance optimization
const SkillsSection = lazy(() => import('../components/public/SkillsSection'));
const ProjectsSection = lazy(() => import('../components/public/ProjectsSection'));
const ExperienceSection = lazy(() => import('../components/public/ExperienceSection'));
const CertificationsSection = lazy(() => import('../components/public/CertificationsSection'));
const ContactSection = lazy(() => import('../components/public/ContactSection'));

export default function HomePage() {
  const { profile } = usePortfolio();

  // Dynamic Circular Favicon Sync
  useEffect(() => {
    if (profile?.avatar_url) {
      const img = new Image();
      img.crossOrigin = 'anonymous'; // Required for external URLs (Supabase storage)
      img.src = profile.avatar_url;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const size = Math.min(img.width, img.height);
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext('2d');

        // Create circular mask
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        // Draw image (centered if not perfectly square)
        const dx = (size - img.width) / 2;
        const dy = (size - img.height) / 2;
        ctx.drawImage(img, dx, dy, img.width, img.height);

        // Export to data URL
        const circularDataUrl = canvas.toDataURL('image/png');

        // Inject into document
        let link = document.querySelector("link[rel*='icon']");
        if (!link) {
          link = document.createElement('link');
          document.getElementsByTagName('head')[0].appendChild(link);
        }
        link.type = 'image/png';
        link.rel = 'icon';
        link.href = circularDataUrl;
      };
    }
  }, [profile?.avatar_url]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0f] transition-colors duration-300">
      <Navbar />
      <main>
        {/* Hero loads immediately for instant LCP (Largest Contentful Paint) */}
        <HeroSection />

        {/* Subsequent sections are lazily loaded with a smooth suspense boundary */}
        <Suspense fallback={<div className="min-h-[50vh] bg-transparent" />}>
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <CertificationsSection />
          <ContactSection />
        </Suspense>
      </main>
    </div>
  );
}