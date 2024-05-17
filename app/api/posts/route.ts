import Post from '@models/post';
import User from '@models/user';
import { connectToDB } from '@utils/database';
import { NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';

// Get ID of users with username contains the filter text
const getUserIdsByFilter = async (regexFilter: RegExp): Promise<string[]> => {
  return (await User.find({ username: { $regex: regexFilter } })).map(
    (user) => user._id
  );
};

// Get posts. If a search param is required we filter them, if not we return all
export const GET = async (req: NextRequest, res: NextApiResponse) => {
  try {
    // TODO:: This is duplicated in all routes, should create a middleware for this
    await connectToDB();

    let allPosts;

    // Check if there is a filter value
    /* !! NOTE:: This is specific to NextJS. In a normal API qe could do const {filter} = req.query
    https://github.com/vercel/next.js/discussions/47072#discussioncomment-5291376 !! */
    const filterVal = req.nextUrl.searchParams.get('filter');

    // If no filter value is passed, return all posts
    if (!filterVal) {
      // Get all posts (populate "creator" key which we create on "api/post/new")
      allPosts = await Post.find({}).populate('creator').exec();
    } else {
      const regexFilter = new RegExp(filterVal, 'i');

      // Define DB query depending if we have a filter or not
      const query = {
        $or: [
          { prompt: { $regex: regexFilter } },
          { tag: { $regex: regexFilter } },
          { creator: { $in: await getUserIdsByFilter(regexFilter) } },
        ],
      };

      // Get all posts (populate "creator" key which we create on "api/post/new")
      allPosts = await Post.find(query).populate('creator').exec();
    }

    // Return all posts
    return NextResponse.json(allPosts, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed retrieving posts', {
      status: 500,
    }); // Handle errors gracefully
  }
};
