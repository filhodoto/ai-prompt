'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  useSession,
  signIn,
  signOut,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers/index';

type Providers = Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider>;

const loggedInLinks = [
  { text: 'My Profile', url: '/profile' },
  { text: 'Create Post', url: '/create-post' },
];

const renderProvidersSignIn = (providers: Providers) => {
  return Object.values(providers).map((provider) => {
    return (
      <button
        key={provider.name}
        type="button"
        onClick={() => signIn(provider.id)}
        className="outline_btn"
      >
        Sign In
      </button>
    );
  });
};

const defaultAvatar = '/assets/images/avatar.svg';

const renderUserAvatar = (image = defaultAvatar) => (
  <Image
    className="object-contain rounded-full"
    src={image}
    alt="User icon"
    width={37}
    height={37}
  />
);

const Nav = () => {
  const { data: session, status } = useSession();
  const [providers, setProviders] = useState<Providers | null>(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const requestProviders = async () => {
      const providers = await getProviders();
      console.log('Providers', providers);

      // Set providers in state
      setProviders(providers);
    };

    requestProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          className="object-contain"
          src="/assets/images/logo.svg"
          alt="Promptly Logo"
          width={30}
          height={30}
        />
        <p className="logo_text">Promptly</p>
      </Link>
      {/* Desktop */}
      <div className="sm:flex hidden">
        <div className="flex gap-3 md:fap-5">
          {session?.user ? (
            <>
              {/* For logged in User */}
              {[loggedInLinks[1]].map(({ text, url }) => (
                <Link key={url} href={url} className="black_btn">
                  {text}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => signOut()}
                className="outline_btn"
              >
                Sign Out
              </button>
              <Link href="/profile">
                {renderUserAvatar(session?.user.image as string)}
              </Link>
            </>
          ) : (
            providers && renderProvidersSignIn(providers)
          )}
        </div>
      </div>
      {/* Mobile */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            {renderUserAvatar(session?.user.image as string)}
            {toggleDropdown && (
              <div className="dropdown">
                {loggedInLinks.map(({ text, url }) => (
                  <Link
                    key={url}
                    href={url}
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    {text}
                  </Link>
                ))}
                <button
                  type="button"
                  className="dropdown_link pt-3 mt-2 w-2/3 border-t text-right"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          providers && renderProvidersSignIn(providers)
        )}
      </div>
    </nav>
  );
};

export default Nav;
