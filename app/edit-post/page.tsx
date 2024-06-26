'use client';
import Form from '@components/Form';
import { PostInfoProps, PostProps } from '@utils/types/shared';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

const EditPost = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // NOTE:: Another way fo doing this would be to pass it as a slug in the url
  const searchParams = useSearchParams();
  const postId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<PostInfoProps>();

  const UpdatePost = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // Tell state we are submitting
    setSubmitting(true);

    // If user id not available, stop process
    if (!session?.user?.id || !post) {
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
        const response = await fetch(`/api/post/${postId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postBody),
        });

        // If post was created correctly we navigate user to homepage
        if (response.ok) router.push('/');
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const getPost = useCallback(async (id: string) => {
    try {
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
  }, []);

  useEffect(() => {
    // Make request to get post data in edit values
    postId && getPost(postId);
  }, [getPost, postId]);

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
