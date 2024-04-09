import User from '@models/user';
import { connectToDB } from '@utils/database';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

interface ProfileProps {
  name: string;
  email: string;
  picture: string;
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
  session: async ({ session }) => {},
  signIn: async ({ profile }: { profile: ProfileProps }) => {
    try {
      await connectToDB();

      // 1. Check if user already exists
      const user = await User.findOne({ email: profile.email });
      // 2. If not, create new user
      if (!user) {
        // TODO:: Make sure this works and probably make this check on frontend
        const sanitizedName = profile.name.replace(' ', '').toLowerCase();

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
});

/* Not the common way but the " the preferred way to handle REST-like requests in App Router (app/)."
according to the documentation
https://next-auth.js.org/configuration/initialization#route-handlers-app */
export { handler as GET, handler as POST };
