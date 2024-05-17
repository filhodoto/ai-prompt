import React from 'react';
import Image from 'next/image';
import PromptCard from './PromptCard';

interface PromptListProps {
  posts: any[];
  isLoading: boolean;
  searchText: string;
}

export const PromptList = ({
  posts,
  isLoading,
  searchText,
}: PromptListProps) => {
  return (
    <div className="mt-16">
      {posts && !isLoading ? (
        <div className="prompt_layout">
          {posts.map((post) => {
            return <PromptCard key={post._id} post={post} />;
          })}
        </div>
      ) : (
        <Image
          src="/assets/images/isLoading.svg"
          alt="Loading"
          width={40}
          height={40}
        />
      )}
      {/* Show feedback for no prompts found */}
      {posts.length === 0 && !isLoading && searchText && (
        <p>No prompts found.</p>
      )}
    </div>
  );
};
