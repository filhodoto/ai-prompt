'use client';
import React, { useEffect, useState } from 'react';

const GET_POSTS_API = '/api/posts';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      // Get all posts
      const response = await fetch(GET_POSTS_API);

      // If post was created correctly we navigate user to homepage
      if (response.ok) {
        const posts = await response.json();
        console.log(posts);
        // setState
        setPosts(posts);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return <div>Feed</div>;
};

export default Feed;
