'use client';
import Form from '@components/Form';
import { UserProps } from '@utils/types/shared';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const defaultPost = {
  prompt: '',
  tag: '',
};

const EditPost = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // NOTE:: Another way fo doing this would be to pass it as a slug in the url
  const searchParams = useSearchParams();
  const postId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState(defaultPost);

  const UpdatePost = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // Tell state we are submitting
    setSubmitting(true);

    // If user id not available, stop process
    // TODO:: Find a way to type session using UserProps in a not intrusive way so we can remove this
    if (!session?.user.id) {
      setSubmitting(false);
      return;
    }

    const postBody = {
      prompt: post.prompt,
      tag: post.tag,
    };

    // Update in database
    try {
      try {
        await fetch(`/api/post/${postId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postBody),
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const getPost = async (id: string) => {
    try {
      console.log('postId >>> ', postId);
      // Get all posts
      const response = await fetch(`/api/post/${id}`);

      // If post was created correctly we navigate user to homepage
      if (response.ok) {
        const post = await response.json();

        // setState
        setPost(post);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    // Make request to get post data in edit values
    postId && getPost(postId);
  }, [postId]);

  return post ? (
    <Form
      type="Update"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={UpdatePost}
    />
  ) : (
    <></>
  );
};

export default EditPost;
