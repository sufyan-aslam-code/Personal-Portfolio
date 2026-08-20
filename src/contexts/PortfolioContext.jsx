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
