import NextAuth, { DefaultSession } from 'next-auth';
import { GoogleProfile } from 'next-auth/providers/google';
import { ClientSafeProvider } from 'next-auth/react';

declare module 'next-auth' {
  /** The OAuth profile returned from your provider */
  interface Profile extends GoogleProfile {} // Profile now extends GoogleProfile

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: Profile;
  }
}
