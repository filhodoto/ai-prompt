import type { Metadata } from 'next';
import '@styles/globals.css';
import { ReactNode, Suspense } from 'react';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

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
      <Provider>
        <body>
          <div className="main">
            <div className="gradient" />
          </div>
          <div className="app">
            <Nav />
            {/* TODO:: Add an actual loading animation here */}
            <Suspense>{children}</Suspense>
          </div>
        </body>
      </Provider>
    </html>
  );
};

export default RootLayout;
