import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { VoiceAssistantModal } from '@/components/voice/VoiceAssistantModal';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#173F2B',
};

export const metadata: Metadata = {
  title: 'FasalClaim — Premium Agritech Crop-Insurance Claim-Assurance Platform',
  description: 'Understand possible crop insurance claim bottlenecks, organize supporting evidence, and discover the right next step. Independent claim assurance for Indian agriculture.',
  keywords: ['crop insurance', 'PMFBY', 'fasal bima', 'claim assurance', 'farmer grievance', 'agritech', 'rural fintech'],
  authors: [{ name: 'FasalClaim Agritech' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23173F2B'><path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z'/></svg>" />
      </head>
      <body className="min-h-screen flex flex-col bg-ivory-50 text-charcoal">
        <AppProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <VoiceAssistantModal />
        </AppProvider>
      </body>
    </html>
  );
}
