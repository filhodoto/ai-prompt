'use client';
import { PostProps } from '@utils/types/shared';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface PromptCardProps {
  post: PostProps;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

const PromptCard = ({ post, handleEdit, handleDelete }: PromptCardProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const pathName = usePathname();
  const [copied, setCopied] = useState(false);

  const isCreator = session?.user.id === post.creator._id;

  const handleProfileClick = () =>
    router.push(`profile/${post.creator.username}`);

  const handleCopyClick = () => {
    // Update state so we can show feedback to suer that text as been copied
    setCopied(true);

    // Copy text to clipboard
    navigator.clipboard.writeText(post.prompt);

    // Clean copy stat after 3s
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopyClick}>
          <Image
            alt="copy_btn"
            src={copied ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => console.log('handleTagClick')}
      >
        {post.tag}
      </p>
      {isCreator && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-grey-100 pt-3">
          <p
            className="font-inter text-sm text-gray-500 cursor-pointer"
            onClick={() => handleEdit(post._id)}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm text-red-600 cursor-pointer"
            onClick={() => handleDelete(post._id)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
