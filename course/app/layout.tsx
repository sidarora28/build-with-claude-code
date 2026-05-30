import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daily Brain — Orchestrator',
  description: 'Watch your EA orchestrate three specialists in real time.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="scanline">{children}</body>
    </html>
  );
}
