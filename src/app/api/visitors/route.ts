import { NextResponse } from 'next/server';

// Prevent Vercel from caching this route as static during build
export const dynamic = 'force-dynamic';

export async function GET() {
  const token = process.env.UMAMI_API_TOKEN;
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_ID || '50114b90-1237-4566-b3e2-39cd5760b35f';

  if (!token) {
    return NextResponse.json({ error: 'Umami API Token not configured' }, { status: 400 });
  }

  try {
    const startAt = 0; // all time
    const endAt = Date.now();

    // Fetch stats using Umami Cloud API
    const response = await fetch(
      `https://api.umami.is/v1/websites/${websiteId}/stats?startAt=${startAt}&endAt=${endAt}`,
      {
        headers: {
          'x-umami-api-key': token,
          'Accept': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch stats from Umami' }, { status: response.status });
    }

    const data = await response.json();
    console.log('Umami API response data:', data);
    const visitors = typeof data.visitors === 'number' 
      ? data.visitors 
      : (data.visitors?.value || 0);

    return NextResponse.json({ visitors });
  } catch (error) {
    console.error('Error fetching Umami stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
