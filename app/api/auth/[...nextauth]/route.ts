import User from '@models/user';
import { connectToDB } from '@utils/database';
import NextAuth from 'next-auth';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';

/* More about session and signIn callbacks here:
https://next-auth.js.org/getting-started/example#extensibility */

const handler = NextAuth({
  // Array with the providers we will handle
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // Store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user?.email });

      if (session.user) session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        /* We know this will be a GoogleProfile and we extend it as per documentation. But for some reason typescript 
        still thinks name can be undefined, so we need to do this check */
        if (!profile || !profile.name)
          throw new Error('Google profile data unavailable. Sign-in failed.');

        await connectToDB();

        // Remove spaces and change "ç" for "c"
        const sanitizedName = profile.name
          .replace(/\s/g, '')
          .replace(/ç/g, 'c')
          .toLowerCase();

        // 1. Check if user already exists
        const user = await User.findOne({ email: profile.email });

        // 2. If not, create new user
        if (!user) {
          User.create({
            email: profile.email,
            username: sanitizedName,
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log('ERROR signin in:: ', error);

        return false;
      }
    },
  },
});

/* Not the common way but the " the preferred way to handle REST-like requests in App Router (app/)."
according to the documentation
https://next-auth.js.org/configuration/initialization#route-handlers-app */
export { handler as GET, handler as POST };
