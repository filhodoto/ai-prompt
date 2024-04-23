import NextAuth, { DefaultSession } from 'next-auth';
import { UserProps } from './shared';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: UserProps;
  }
}
