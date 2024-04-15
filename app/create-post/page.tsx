'use client';
import Form from '@components/Form';
import { UserProps } from '@utils/types/shared';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const defaultPost = {
  prompt: '',
  tag: '',
};

// TODO name this better and probably set it's own file
const CREATE_POST_API = '/api/post/new';

// TODO:: Use React Form for the form in the future
const CreatePrompt = () => {
  //TODO:: Type this correctly,
  const { data: session } = useSession();
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState(defaultPost);

  const createPost = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // Tell state we are submitting
    setSubmitting(true);

    // If user id not available, stop process
    // TODO:: Find a way to type session using UserProps in a not intrusive way so we cna remove this
    if (!session?.user.id) {
      setSubmitting(false);
      return;
    }
    const postBody = {
      prompt: post.prompt,
      tag: post.tag,
      userId: session?.user.id,
    };

    // Create in database
    try {
      // Create new post
      const response = await fetch(CREATE_POST_API, {
        method: 'POST',
        body: JSON.stringify(postBody),
      });

      // If post was created correctly we navigate user to homepage
      if (response.ok) router.push('/');
    } catch (error) {
      console.error(error);
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
