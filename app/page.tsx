import Feed from '@components/Feed';
import React from 'react';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share <br />
        <span className="blue_gradient">AI Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Unlock your creative potential with Promptly! This open-source AI
        prompting tool empowers you to discover inspiring prompts, craft your
        own ideas, and share them with the world.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
