"use client";

import Sidebar from "@/components/sidebar";
import FireHeatmap from "@/modules/home/components/FireHeatmap";
import type { Day } from "@/modules/home/components/types";
import Fire2 from "../../../../public/animations/Fire2.json";
import React from "react";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const { data: heatmapData, isLoading: isHeatmapLoading } = useSWR<Day[]>(
    user ? "/api/user/heatmap-activity" : null,
    fetcher
  );

  return (
    <div className="bg-[#09090B] w-full min-h-screen text-gray-200">
      <div className="flex-1 flex-col">
        {/* Left sidebar */}
        <div className="w-full flex justify-between p-5">
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
            <span className="text-white">XorThax</span>
          </Link>
          <div className="">
            <Sidebar />
          </div>
        </div>


        {/* Main Content */}
        <main className="flex-1">
          {/* Added 'grid' and 'grid-cols-1 lg:grid-cols-3' so col-span works properly */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 m-5">

            {/* Column 1 narrow, The user profile */}
            <div className="col-span-1 flex flex-col gap-6">
              {/* STATE 1: SESSION IS LOADING */}
              {isPending ? (
                <div className="flex flex-col items-center gap-4 p-4 bg-[#0b0b0c] border border-gray-700 rounded-lg">
                  <div className="w-40 h-40 rounded-full bg-[#2a2a2a] animate-pulse" />
                  <div className="w-40 h-4 rounded bg-[#2a2a2a] animate-pulse" />
                  <div className="w-24 h-3 rounded bg-[#2a2a2a] animate-pulse" />
                </div>
              ) : null}

              {/* STATE 2: USER IS LOGGED IN */}
              {isPending === false && user && (
                <div className="w-full max-w-3xl mx-auto bg-[#121212] border border-neutral-800 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] overflow-hidden ring-1 ring-white/5">
                  <div className="p-4 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-8">
                      <div className="flex-shrink-0 relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur opacity-50 group-hover:opacity-75 transition duration-500"></div>
                        <Image
                          src={user.image || "/home/user.png"}
                          alt={user.name || "User"}
                          width={128}
                          height={128}
                          className="relative rounded-full w-20 h-20 sm:w-32 sm:h-32 object-cover border-4 border-[#121212] ring-2 ring-neutral-800"
                        />
                      </div>

                      <div className="flex-1 text-center sm:text-left space-y-3 sm:space-y-4 w-full">
                        <div>
                          <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
                            {user.name}
                          </h2>
                        </div>
                        <div className="h-px w-full bg-neutral-800/80"></div>
                        <div className="grid grid-cols-1 gap-y-2 sm:gap-y-3 text-xs sm:text-base">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-4">
                            <span className="text-neutral-500 font-medium min-w-[60px] sm:min-w-[80px]">Email:</span>
                            <span className="text-neutral-300 truncate">{user.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0a0a0a] p-3 sm:px-8 sm:py-4 border-t border-neutral-800">
                    <button className="group relative w-full flex justify-center items-center px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-medium text-white bg-neutral-800 hover:bg-neutral-750 border border-neutral-700/50 rounded-xl transition-all duration-200 ease-in-out overflow-hidden hover:border-indigo-500/30 hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-[#121212]">
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
                      <span className="relative flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400 group-hover:text-indigo-300 transition-colors">
                          <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                          <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                        </svg>
                        Edit Profile
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Column 2 wide, The heatmap */}
            <div className="col-span-1 lg:col-span-2 flex flex-col gap-4 sm:gap-6">
              {/* LOADING STATE */}
              {isHeatmapLoading && (
                <div className="w-full bg-[#121212] border border-neutral-800 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] ring-1 ring-white/5 h-32 sm:h-48 flex items-center justify-center">
                  <div className="text-neutral-500 font-medium text-xs sm:text-sm animate-pulse">
                    Loading activity...
                  </div>
                </div>
              )}

              {/* DATA STATE */}
              {heatmapData && (
                <div className="w-full border border-neutral-800 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] ring-1 ring-white/5 overflow-hidden">
                  <div className=" sm:p-6 ">
                    <div className="rounded-xl border border-neutral-800 w-full p-2">

                      {/* SCROLL CONTAINER CONFIGURATION:
                         1. overflow-x-auto: Enables scroll.
                         2. Removed 'no-scrollbar' class.
                         3. Added webkit scrollbar styling (standard on Desktop/Android).
                      */}
                      <div className="w-full overflow-x-auto pb-2
                        scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent
                        hover:scrollbar-thumb-neutral-600
                        [&::-webkit-scrollbar]:h-2
                        [&::-webkit-scrollbar-track]:bg-transparent
                        [&::-webkit-scrollbar-thumb]:bg-neutral-700
                        [&::-webkit-scrollbar-thumb]:rounded-full "
                      >
                        {/* FORCE WIDTH WRAPPER:
                           min-w-[800px] ensures the content is wider than a phone screen,
                           forcing the browser to show the scrollbar.
                        */}
                        <div className="min-w-[800px] sm:min-w-full p-2 ">
                          <FireHeatmap
                            data={heatmapData}
                            lottieAnimationData={Fire2}
                            threshold={10}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}