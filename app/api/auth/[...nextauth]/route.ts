import User from '@models/user';
import { UserProps } from '@types/shared';
import { connectToDB } from '@utils/database';
import NextAuth from 'next-auth';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';

interface SessionProps {
  user: UserProps;
}

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
    async session({ session }: { session: SessionProps }) {
      // Store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });

      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }: { profile: GoogleProfile }) {
      try {
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
