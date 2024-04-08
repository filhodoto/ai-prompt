import type { Metadata } from 'next';
import '@styles/globals.css';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Promptly',
  description: 'Discover & Share AI Prompts for your day to day work',
};
interface RootLayoutProps {
  children?: ReactNode;
}
const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <div className="app">{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
