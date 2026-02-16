import type { Metadata } from 'next';
import { Orbitron, Rajdhani } from 'next/font/google';
import './globals.css';
import clsx from 'clsx';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-rajdhani',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aston Martin DB11 | Scrollytelling Showcase',
  description: 'Experience the Aston Martin DB11 in a scroll-controlled showcase.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={clsx(orbitron.variable, rajdhani.variable)}>
      <body className="font-sans antialiased bg-aston-black text-white selection:bg-aston-lime selection:text-aston-black">
        {children}
      </body>
    </html>
  );
}
