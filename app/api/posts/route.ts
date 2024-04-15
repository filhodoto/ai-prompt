import Post from '@models/post';
import { connectToDB } from '@utils/database';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  try {
    // TODO:: This is duplicated in all routes, should create a middleware for this
    await connectToDB();

    // Get all posts (populate "creator" key which we create on "api/post/new")
    const allPosts = await Post.find({}).populate('creator');

    // Return all posts
    return NextResponse.json(allPosts, { status: 200 });
  } catch (error) {
    return new Response('Failed retrieving all posts', { status: 500 });
  }
};
