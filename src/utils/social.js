export const getSocialUrl = (url, platform) => {
  if (!url) return '';
  
  // If it already has a protocol, return it as is
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:')) {
    return url;
  }

  // Remove leading slashes or @ symbols if the user accidentally included them
  let clean = url.replace(/^[@/]+/, '');

  switch (platform) {
    case 'github':
      return clean.includes('github.com') ? `https://${clean}` : `https://github.com/${clean}`;
    case 'linkedin':
      return clean.includes('linkedin.com') ? `https://${clean}` : `https://linkedin.com/in/${clean}`;
    case 'twitter':
      return clean.includes('twitter.com') || clean.includes('x.com') ? `https://${clean}` : `https://x.com/${clean}`;
    case 'instagram':
      return clean.includes('instagram.com') ? `https://${clean}` : `https://instagram.com/${clean}`;
    case 'facebook':
      return clean.includes('facebook.com') ? `https://${clean}` : `https://facebook.com/${clean}`;
    case 'whatsapp':
      // Strip non-digits if it's just a number
      const cleanNumber = clean.replace(/\D/g, '');
      return `https://wa.me/${cleanNumber}`;
    default:
      return `https://${clean}`;
  }
};
