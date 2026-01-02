"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Header = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleSignOut = () => {
    signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  const user = session?.user;

  return (
    <header className="flex justify-between items-center py-2 px-4 bg-black shadow-sm border-2 border-gray-900">
      {/* MAIN LOGO */}
      <Link
        href="/"
        className="text-sm md:text-base lg:text-lg font-semibold flex justify-center items-center space-x-2"
      >
        <Image
          src="https://xorthax-main-logo-asset.s3.us-east-1.amazonaws.com/Nor.png"
          alt="XorThax"
          width={40}
          height={40}
          className="invert w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
        />
        <span className="text-white mb-1">XorThax</span>
      </Link>

      {/* HEADER BUTTONS AND USER PROFILE */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-5">

        {/* STATE1: SESSION IS LOADING */}
        {isPending == true && (
          <div className="h-8 w-24 sm:w-36 bg-gray-800 rounded-md animate-pulse" />
        )}

        {/* STATE2: USER IS LOGGED IN */}
        {isPending == false && user && (
          <>
            <div className="flex items-center gap-2 sm:gap-3 md:gap-5 group">
              <Image
                src={user.image || "/home/user.png"}
                alt={user.name || "You"}
                width={30}
                height={30}
                className="invert rounded-full w-7 h-7 sm:w-8 sm:h-8"
              />
              <span className="hidden sm:inline text-white font-mono text-sm">{user.name}</span>
            </div>
            <Button
              onClick={handleSignOut}
              className="bg-transparent text-[#808080] font-mono font-bold border transition-colors duration-300 ease-in-out border-[#1F1F23] rounded-xl py-1 px-5 hover:border-[#71717A] hover:bg-[#1F1F23] hover:text-white"
            >
              <span className="hidden sm:inline">Sign Out</span>
              <span className="sm:hidden">↪</span>
            </Button>
          </>
        )}

        {/* STATE3 : USER IS LOGGED OUT */}
        {isPending == false && !user && (
          <>
            {/* SIGN IN */}
            <Link
              href="/sign-in"
              className="text-[#808080] font-mono font-bold border-3 transition-colors duration-300 ease-in-out border-[#1F1F23] rounded-4xl py-1 px-5 bg-[#090A0B] hover:border-[#71717A] hover:bg-[#1F1F23] hover:text-white"
            >
              Log in
            </Link>
            {/* SIGN UP */}
            <Link
              href="/sign-up"
              className="bg-white font-mono transition-colors duration-300 ease-in-out  text-black px-5 py-1 border-3 border-[#1F1F23] rounded-4xl hover:border-[#71717A] hover:bg-[#A1A1AA]"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
