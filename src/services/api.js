import { supabase } from '../lib/supabase';

// ========================
// PROFILE
// ========================

export async function fetchProfile() {
  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .limit(1)
    .single();
  if (error) throw error;
  return data;
}

export async function updateProfile(updates) {
  const { data: existing } = await supabase
    .from('profile')
    .select('id')
    .limit(1)
    .single();

  if (existing) {
    const { data, error } = await supabase
      .from('profile')
      .update(updates)
      .eq('id', existing.id)
      .select()
      .single();
    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from('profile')
      .insert(updates)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}

// ========================
// SKILLS
// ========================

export async function fetchSkills() {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) throw error;
  return data;
}

export async function createSkill(skill) {
  const { data, error } = await supabase
    .from('skills')
    .insert(skill)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateSkill(id, updates) {
  const { data, error } = await supabase
    .from('skills')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteSkill(id) {
  const { error } = await supabase.from('skills').delete().eq('id', id);
  if (error) throw error;
}

// ========================
// EXPERIENCES
// ========================

export async function fetchExperiences() {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) throw error;
  return data;
}

export async function createExperience(experience) {
  const { data, error } = await supabase
    .from('experiences')
    .insert(experience)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateExperience(id, updates) {
  const { data, error } = await supabase
    .from('experiences')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteExperience(id) {
  const { error } = await supabase.from('experiences').delete().eq('id', id);
  if (error) throw error;
}

// ========================
// PROJECTS
// ========================

export async function fetchProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) throw error;
  return data;
}

export async function createProject(project) {
  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateProject(id, updates) {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteProject(id) {
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw error;
}

// ========================
// CERTIFICATIONS
// ========================

export async function fetchCertifications() {
  const { data, error } = await supabase
    .from('certifications')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) throw error;
  return data;
}

export async function createCertification(cert) {
  const { data, error } = await supabase
    .from('certifications')
    .insert(cert)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateCertification(id, updates) {
  const { data, error } = await supabase
    .from('certifications')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteCertification(id) {
  const { error } = await supabase.from('certifications').delete().eq('id', id);
  if (error) throw error;
}

// ========================
// FILE STORAGE
// ========================

export async function uploadFile(bucket, path, file) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true,
    });
  if (error) throw error;
  return data;
}

export function getPublicUrl(bucket, path) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteFile(bucket, path) {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) throw error;
}
