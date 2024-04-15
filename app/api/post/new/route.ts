import Post from '@models/post';
import { connectToDB } from '@utils/database';

export const POST = async (req: Request) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();

    // Create post
    const newPost = new Post({ creator: userId, prompt, tag });

    // Persist data to the database
    await newPost.save();

    // Return created post with 201 status (Created)
    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    return new Response('Failed to create post', { status: 500 });
  }
};
