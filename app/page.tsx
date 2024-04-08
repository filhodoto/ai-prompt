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
        Lorem ipsum is placeholder text commonly used in the graphic, print, and
        publishing industries for previewing layouts and visual mockups.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
