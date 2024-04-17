'use client';
import PromptCard from '@components/PromptCard';
import { PostProps, UserProps } from '@utils/types/shared';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';

const Profile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [user, setUser] = useState<UserProps | null>(null);

  const handleEdit = () => {
    // Logic to edit profile here
  };

  const handleDelete = async (id: string) => {
    // Logic to edit profile here
    try {
      await fetch(`/api/post/${id}`, { method: 'DELETE' });
    } catch (error) {
      console.log(error);
    }
  };

  const getUserPosts = useCallback(async () => {
    if (!user) return;

    // Make API request to return all posts with creator == userID
    try {
      // Get all posts
      const response = await fetch(`/api/users/${user.id}/posts`);

      // If post was created correctly we navigate user to homepage
      if (response.ok) {
        const posts: PostProps[] = await response.json();

        // setState
        setPosts(posts);
      }
    } catch (error) {
      console.error(error);
    }
  }, [user]);

  useEffect(() => {
    if (session?.user && !user) setUser(session?.user);
  }, [session, user]);

  useEffect(() => {
    if (user) getUserPosts();
  }, [user, getUserPosts]);

  return user ? (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{user.name} Profile</span>
      </h1>
      <p className="desc text-left">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>

      <div className="mt-10 prompt_layout">
        {posts &&
          posts.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
      </div>
    </section>
  ) : (
    <></>
  );
};

export default Profile;
