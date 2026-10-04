import { createContext, useState, useEffect, useCallback } from 'react';
import {
  fetchProfile,
  fetchSkills,
  fetchExperiences,
  fetchProjects,
  fetchCertifications,
} from '../services/api';

export const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [profileRes, skillsRes, expRes, projRes, certRes] =
        await Promise.allSettled([
          fetchProfile(),
          fetchSkills(),
          fetchExperiences(),
          fetchProjects(),
          fetchCertifications(),
        ]);

      if (profileRes.status === 'fulfilled') setProfile(profileRes.value);
      if (skillsRes.status === 'fulfilled') setSkills(skillsRes.value || []);
      if (expRes.status === 'fulfilled') setExperiences(expRes.value || []);
      if (projRes.status === 'fulfilled') setProjects(projRes.value || []);
      if (certRes.status === 'fulfilled') setCertifications(certRes.value || []);

      // If all failed, set an error
      const allFailed = [profileRes, skillsRes, expRes, projRes, certRes].every(
        (r) => r.status === 'rejected'
      );
      if (allFailed) {
        setError('Failed to load portfolio data. Please check your connection.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  // Dynamically update document head metadata when profile is loaded
  useEffect(() => {
    if (profile?.avatar_url) {
      const avatarUrl = profile.avatar_url;
      
      // Update OpenGraph Image with standard URL (Base64 is often rejected by scrapers)
      let ogImage = document.querySelector("meta[property='og:image']");
      if (!ogImage) {
        ogImage = document.createElement('meta');
        ogImage.setAttribute('property', 'og:image');
        document.head.appendChild(ogImage);
      }
      ogImage.content = avatarUrl;

      // Create circular favicon using canvas
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        
        // Draw circular clipping mask
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        
        // Draw image inside mask
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const roundedDataUrl = canvas.toDataURL('image/png');
        
        // Update standard favicon
        let icon = document.querySelector("link[rel~='icon']");
        if (!icon) {
          icon = document.createElement('link');
          icon.rel = 'icon';
          document.head.appendChild(icon);
        }
        icon.href = roundedDataUrl;
        
        // Update Apple Touch Icon
        let appleIcon = document.querySelector("link[rel='apple-touch-icon']");
        if (!appleIcon) {
          appleIcon = document.createElement('link');
          appleIcon.rel = 'apple-touch-icon';
          document.head.appendChild(appleIcon);
        }
        appleIcon.href = roundedDataUrl;
      };
      img.src = avatarUrl;
    }
  }, [profile?.avatar_url]);

  const value = {
    profile,
    skills,
    experiences,
    projects,
    certifications,
    loading,
    error,
    refresh: loadAll,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}
