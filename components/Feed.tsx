'use client';
import React, { useEffect, useState } from 'react';
import PromptCard from './PromptCard';
import { PostProps } from '@utils/types/shared';

const GET_POSTS_API = '/api/posts';

const Feed = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [searchText, setSearchText] = useState('');

  const showPosts = async (posts: Response) => {
    const postsJSON = await posts.json();

    // Show posts in list
    setPosts(postsJSON);
  };

  const getPosts = async () => {
    try {
      // Get all posts
      const response = await fetch(GET_POSTS_API);

      if (response.ok) showPosts(response);
    } catch (error) {
      console.error(error);
    }
  };

  /* NOTE:: This function is similar to get posts, there's some logic repeatition.
  we could use only one but for code clarity we are use two  */
  const handleSearch = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      // Get all posts
      const response = await fetch(`${GET_POSTS_API}?filter=${searchText}`);

      if (response.ok) showPosts(response);
    } catch (error) {}
  };

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center" onSubmit={handleSearch}>
        <input
          type="text"
          className="search_input peer"
          placeholder="Search for user or tag"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
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
