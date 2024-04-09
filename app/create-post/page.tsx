'use client';
import Form from '@components/Form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export interface PostProps {
  prompt: string;
  tag: string;
}

const defaultPost = {
  prompt: '',
  tag: '',
};

// TODO name this better and probably set it's own file
const CREATE_POST = '/api/post/create';

// TODO:: Use React Form for the form in the future
const CreatePrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState(defaultPost);

  const createPost = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // Tell state we are submitting
    setSubmitting(true);

    const postBody = {
      prompt: post.prompt,
      tag: post.tag,
      userId: session?.user.id as string,
    };

    // Create in database
    try {
      // Create new post
      const response = await fetch(CREATE_POST, {
        method: 'POST',
        body: JSON.stringify(postBody),
      });
      // If post was created correctly we navigate user to
      if (response.ok) router.push('/');
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPost}
    />
  );
};

export default CreatePrompt;
