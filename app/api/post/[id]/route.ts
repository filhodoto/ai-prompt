import Post from '@models/post';
import { connectToDB } from '@utils/database';
import { NextResponse } from 'next/server';

// GET post from DB by Id
export const GET = async (req: Request, { params }) => {
  const { id } = params;

  try {
    await connectToDB();

    const post = await Post.findById({ id });

    // Return post or 404 message in case we don't find it
    return post
      ? NextResponse.json(post, { status: 200 })
      : new Response('Post not found!', { status: 404 });
  } catch (error) {
    console.log('error >>> ', error);
    return new Response('Failed to get post by id', { status: 500 });
  }
};

// Delete post from DB by Id
export const DELETE = async (req: Request, { params }) => {
  const { id } = params;

  try {
    await connectToDB();

    // If we needed to return the deleted post we should use findOneAndDelete() instead
    await Post.deleteOne({ id });

    // Return created post with 201 status (Created)
    return new Response('Post deleted successfully', { status: 200 });
  } catch (error) {
    console.log('error >>> ', error);
    return new Response('Failed to delete post', { status: 500 });
  }
};
