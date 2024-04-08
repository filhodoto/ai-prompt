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

const Nav = () => {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState<Providers | null>(null);

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
          {isUserLoggedIn ? (
            <>
              {/* For logged in User */}
              <Link href="/create-prompt" className="black_btn">
                Create Post
              </Link>
              <button
                type="button"
                onClick={() => signOut()}
                className="outline_btn"
              >
                Sign Out
              </button>
              <Link href="/profile">
                <Image
                  className="object-contain rounded-full"
                  src="/assets/images/logo.svg"
                  alt="User icon"
                  width={30}
                  height={30}
                />
              </Link>
            </>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => {
                  <button
                    key={provider.name}
                    type="button"
                    onClick={() => signIn(provider.id)}
                    className="outline_btn"
                  >
                    Sign In
                  </button>;
                })}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
