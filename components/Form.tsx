import { PostProps } from '@utils/types/shared';
import Link from 'next/link';
import React from 'react';

interface FormProps {
  type: 'Create' | 'Delete' | 'Update';
  post: PostProps;
  setPost: (arg0: PostProps) => void;
  submitting: boolean;
  handleSubmit: (e: React.SyntheticEvent) => Promise<void>;
}

const Form = ({ type, post, setPost, submitting, handleSubmit }: FormProps) => {
  return (
    <section className="w-full flex-start flex-col">
      <h1 className="head_text text-left blue_gradient">{type} Post</h1>
      <p className="desc max-w-md">
        Share your amazing prompts with the world and unlock the full potential
        of any AI platform.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            className="form_textarea"
            placeholder="write your prompt..."
            required
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tags <span className="font-normal">(#web, #cooking)</span>
          </span>
          <input
            value={post.tag}
            type="text"
            className="form_input"
            placeholder="#tag"
            required
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
          />
        </label>
        <div className="flex flex-end gap-7 mt-3 mb-5">
          <Link href="/" className="text-gray-500">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full border bg-transparent py-1.5 px-5  transition-all hover:bg-logo-green hover:text-white hover:border-logo-green text-center text-sm font-inter flex items-center justify-center w-auto border-logo-green text-logo-green"
          >
            {type} {submitting && '...'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
