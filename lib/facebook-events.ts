declare global {
  interface Window {
    fbq: any;
  }
}

export const trackFacebookLead = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead');
  }
}; 