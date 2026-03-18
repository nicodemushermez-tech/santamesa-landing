import { useEffect } from 'react';

const CALENDLY_URL = 'https://calendly.com/nicodemushermez';

export function CalendlyEmbed() {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="calendly-inline-widget w-full rounded-2xl overflow-hidden"
      data-url={`${CALENDLY_URL}?hide_event_type_details=0&hide_gdpr_banner=1&background_color=0F1623&text_color=F8FAFC&primary_color=C4956A`}
      style={{ minWidth: '320px', height: '900px', border: '1px solid #1E2D45' }}
    />
  );
}
