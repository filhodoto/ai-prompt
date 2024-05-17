'use client';
import React, { useEffect, useState } from 'react';
import PromptCard from './PromptCard';
import { PostProps } from '@utils/types/shared';
import { PromptList } from './PromptList';

const GET_POSTS_API = '/api/posts';

const Feed = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const showPosts = async (posts: Response) => {
    const postsJSON = await posts.json();

    // Show posts in list
    setPosts(postsJSON);
  };

  const getPosts = async () => {
    try {
      setIsLoading(true);
      // Get all posts
      const response = await fetch(GET_POSTS_API);

      if (response.ok) showPosts(response);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  /* NOTE:: This function is similar to get posts, there's some logic repetition.
  we could use only one but function for code clarity we are using two  */
  const handleSearch = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      // Get all posts
      const response = await fetch(`${GET_POSTS_API}?filter=${searchText}`);

      if (response.ok) showPosts(response);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
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
      {/* TODO:: Get this to new Component that cna be re-used */}
      <PromptList posts={posts} isLoading={isLoading} searchText={searchText} />
    </section>
  );
};

export default Feed;
