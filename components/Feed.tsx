'use client';
import React, { useEffect, useState } from 'react';
import PromptCard from './PromptCard';
import { PostProps } from '@utils/types/shared';

const GET_POSTS_API = '/api/posts';

const Feed = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [searchText, setSearchText] = useState('');

  const getPosts = async () => {
    try {
      // Get all posts
      const response = await fetch(GET_POSTS_API);

      // If post was created correctly we navigate user to homepage
      if (response.ok) {
        const posts = await response.json();

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

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          className="search_input peer"
          placeholder="Search for user or tag"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
        />
      </form>
      {/* Render posts */}
      {posts && (
        <div className="mt-16 prompt_layout">
          {posts.map((post) => {
            return <PromptCard key={post._id} post={post} />;
          })}
        </div>
      )}
    </section>
  );
};

export default Feed;
