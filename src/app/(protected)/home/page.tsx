"use client";

import Sidebar from "@/components/sidebar";
// import FireHeatmap from "@/modules/home/components/FireHeatmap";
// import type { Day } from "@/modules/home/components/FireHeatmap";
// import Fire2 from "../../../../public/animations/Fire2.json";
import React from "react";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
// import useSWR from "swr";

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

const iconSize = 20;

export default function Page() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  // const { data: heatmapData, isLoading: isHeatmapLoading } = useSWR<Day[]>(
  //   user ? "/api/user/heatmap-activity" : null,
  //   fetcher
  // );

  return (
    <div className="bg-[#09090B] w-full min-h-screen text-gray-200">
      <div className="flex pt-5 pr-5">
        {/* Left sidebar */}
        <aside className="w-72">
          <div className="sticky top-10">
            <Sidebar />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="gap-6">
            {/* Column 1 narrow, The user profile */}
            <div className="col-span-1 flex flex-col gap-6 w-50">
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
                <div className="bg-[#0b0b0c] border border-gray-700 rounded-lg p-4 shadow-sm">
                  <div className="flex flex-col items-center gap-3">
                    <Image
                      src={user.image || "/home/user.png"}
                      alt={user.name || "User"}
                      width={iconSize + 120}
                      height={iconSize + 120}
                      className="rounded-full"
                    />
                    <div className="w-full text-center mt-1">
                      <div className="text-gray-300 font-semibold">
                        {user.name}
                      </div>
                      {/* <div className="text-xs text-gray-500">
                        Rank{" "}
                        <span className="font-medium text-amber-400">
                          319,226
                        </span>
                      </div> */}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* <div className="col-span-1 lg:col-span-2 flex flex-col gap-6  border-2 border-white">
              {isHeatmapLoading && (
                <div className="bg-[#0b0b0c] border border-gray-700 rounded-lg p-4 h-48 flex items-center justify-center">
                  <div className="text-gray-400">Loading activity...</div>
                </div>
              )}

              {heatmapData && (
                <div className="bg-[#0b0b0c] border border-gray-700 rounded-lg p-4">
                  <div className="mt-4 border-2 border-white">
                    <FireHeatmap
                      data={heatmapData}
                      lottieAnimationData={Fire2}
                      threshold={10}
                    />
                  </div>
                </div>
              )}
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
}
