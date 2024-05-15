import Post from '@models/post';
import { connectToDB } from '@utils/database';
import { NextResponse } from 'next/server';

interface ResponseProps {
  params: { userId: string };
}

export const GET = async (req: Request, { params }: ResponseProps) => {
  try {
    // TODO:: This is duplicated in all routes, should create a middleware for this
    await connectToDB();
    const posts = await Post.find({ creator: params.userId }).populate(
      'creator'
    );

    // Return all posts
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return new Response('Failed retrieving user posts', { status: 500 });
  }
};
