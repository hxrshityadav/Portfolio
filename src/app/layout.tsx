import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import OnekoCat from '@/components/common/OnekoCat';
import { ThemeProvider } from '@/components/common/ThemeProviders';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { DM_Sans, Space_Mono } from 'next/font/google';
import ReactLenis from 'lenis/react';
import { ViewTransitions } from 'next-view-transitions';
import { SmoothCursor } from '@/components/ui/smooth-cursor';
import UmamiAnalytics from '@/components/analytics/UmamiAnalytics';

import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = getMetadata('/');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={`${dmSans.variable} ${spaceMono.variable} ${spaceMono.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ReactLenis root>
              <UmamiAnalytics />
              <Navbar />
              {children}
              <OnekoCat />
              <SmoothCursor />
              <Footer />
            </ReactLenis>

            {/* Bottom progressive blur fade */}
            <div
              className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-16 bg-gradient-to-t from-background/80 to-transparent"
              style={{
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                WebkitMaskImage: 'linear-gradient(to top, black 10%, transparent)',
                maskImage: 'linear-gradient(to top, black 10%, transparent)',
              }}
            />
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
