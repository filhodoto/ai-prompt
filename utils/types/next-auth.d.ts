import NextAuth, { DefaultSession } from 'next-auth';
import { UserProps } from './shared';
import { GoogleProfile } from 'next-auth/providers/google';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: UserProps;
  }

  /** The OAuth profile returned from your provider */
  interface Profile extends GoogleProfile {} // Profile now extends GoogleProfile
}
