import Script from 'next/script';

export default function UmamiAnalytics() {
  const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC || 'https://cloud.umami.is/script.js';
  const umamiId = process.env.NEXT_PUBLIC_UMAMI_ID || '50114b90-1237-4566-b3e2-39cd5760b35f';

  return (
    <Script
      id="umami-analytics"
      src={umamiSrc}
      data-website-id={umamiId}
      strategy="afterInteractive"
      async
    />
  );
}
