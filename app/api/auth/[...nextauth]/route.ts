import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  // Array with the providers we will handle
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: async ({ session }) => {},
  signIn: async ({ profile }) => {
    try {
    } catch (error) {
      console.log('ERROR Sign in:: ', error);
    }
  },
});

/* Not the common way but the " the preferred way to handle REST-like requests in App Router (app/)."
according to the documentation
https://next-auth.js.org/configuration/initialization#route-handlers-app */
export { handler as GET, handler as POST };
