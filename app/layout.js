import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './providers';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]/route';

export const metadata = {
  title: 'GreenVibe Botanics - Plant-Based Wellness Store',
  description: 'Discover premium organic plant-based products, wellness supplements, and sustainable living essentials. Nourish your body, nurture the planet.',
  keywords: 'organic, plant-based, wellness, sustainable, eco-friendly, superfoods',
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" data-theme="greenvibe">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌿</text></svg>" />
      </head>
      <body className="antialiased">
        <AuthProvider session={session}>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#10b981',
                color: '#fff',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
