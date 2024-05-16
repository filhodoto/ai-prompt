import Post from '@models/post';
import { connectToDB } from '@utils/database';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';

// Get posts. If a search param is required we filter them, if not we return all
export const GET = async (req: NextRequest, res: NextApiResponse) => {
  try {
    // TODO:: This is duplicated in all routes, should create a middleware for this
    await connectToDB();

    // Check if there is a filter value
    /* !! NOTE:: This is specific to NextJS. In a normal API qe could do const {filter} = req.query
    https://github.com/vercel/next.js/discussions/47072#discussioncomment-5291376 !! */
    const filterVal = req.nextUrl.searchParams.get('filter');

    // Define DB query depending if we have a filter or not
    const query = filterVal
      ? {
          $or: [
            { prompt: { $regex: filterVal } },
            { tag: { $regex: filterVal } },
          ],
        }
      : {};

    // Get all posts (populate "creator" key which we create on "api/post/new")
    const allPosts = await Post.find(query).populate('creator').exec();

    // Return all posts
    return NextResponse.json(allPosts, { status: 200 });
  } catch (error) {
    return new Response('Failed retrieving all posts', { status: 500 });
  }
};
