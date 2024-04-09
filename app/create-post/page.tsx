'use client';
import Form from '@components/Form';
import React, { useState } from 'react';

export interface PostProps {
  prompt: string;
  tag: string;
}

const defaultPost = {
  prompt: '',
  tag: '',
};

// TODO:: Use React Form for the form in the future
const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState();
  const [post, setPost] = useState(defaultPost);

  const createPost = async (e) => {};

  return (
    <Form
      type="Create"
      post={post}
      setPost={createPost}
      submitting={submitting}
      handleSubmit={createPost}
    />
  );
};

export default CreatePrompt;
