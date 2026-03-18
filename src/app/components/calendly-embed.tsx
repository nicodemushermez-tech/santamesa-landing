import { useEffect } from 'react';

interface CalendlyEmbedProps {
  url?: string;
}

export function CalendlyEmbed({ url = 'https://calendly.com/santamesa/strategy-call' }: CalendlyEmbedProps) {
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
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #1E2D45' }}>
      <div
        className="calendly-inline-widget"
        data-url={`${url}?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=C4956A&text_color=F8FAFC&background_color=0F1623`}
        style={{ minWidth: '320px', height: '700px' }}
      />
    </div>
  );
}
