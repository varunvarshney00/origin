"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useSession } from "@/lib/auth-client"; 

const Hero = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-900">
      {/* Background Grid Pattern with Gradient Mask */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
        {/* Main Heading */}
        <h1 className="text-4xl font-bold leading-tight tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
          The Next Generation
          <br />
          <span className="text-blue-400">Learning Platform</span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 max-w-2xl text-lg text-slate-400 md:text-xl">
          Building software is an art.
        </p>
        <p className="max-w-2xl text-lg text-slate-400 md:text-xl">
          Artists can conquer the world.
        </p>

        {/* Dynamic Call to Action Button */}
        <div className="mt-8">
          {/* STATE 1: SESSION IS LOADING */}
          {isPending && (
            <div className="h-[46px] w-48 animate-pulse rounded-full bg-slate-700" />
          )}

          {/* STATE 2: USER IS LOGGED IN */}
          {!isPending && user && (
            <Link
              href="/home" // Redirects to the main app/dashboard page
              className="flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700 active:scale-95"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          )}

          {/* STATE 3: USER IS LOGGED OUT */}
          {!isPending && !user && (
            <Link
              href="/sign-in" // Redirects to the sign-in page
              className="flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700 active:scale-95"
            >
              <span>Get Started</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;