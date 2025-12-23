"use client";
import React, { useEffect, useMemo, useState } from "react";

import { Video } from "@/constant/courseContent";

import {
  Accordion,
  generateCertificateImage,
  // getSafeYouTubeEmbedUrl,
  Tabs,
  fetchWatchedVideos,
} from "./functions";
import Image from "next/image";
import { Play } from "lucide-react";

// -----------------------------
// Main Course Player Component
// -----------------------------

interface CoursePlayerProps {
  initialVideos: Video[];
}

export default function CoursePlayer({ initialVideos = [] }: CoursePlayerProps) {
  // 1. Use 'initialVideos' prop to generate sections
  const sections = useMemo(() => {
    const map = new Map<string, Video[]>();

    // Guard against empty data
    if (!initialVideos || initialVideos.length === 0) return [];

    for (const v of initialVideos) {
      // Ensure section exists (fallback to "General" if undefined)
      const sectionName = v.section || "General";
      if (!map.has(sectionName)) map.set(sectionName, []);
      map.get(sectionName)!.push(v);
    }

    return Array.from(map.entries()).map(([title, videos]) => ({
      title,
      videos,
    }));
  }, [initialVideos]);

  // 2. Initialize active video with the first available video ID
  const [activeVideoId, setActiveVideoId] = useState<string>(
    initialVideos.length > 0 ? initialVideos[0].id : ""
  );

  const [activeTab, setActiveTab] = useState<string>("Overview");
  const [isLoadingWatched, setIsLoadingWatched] = useState(true);

  const [watchedMap, setWatchedMap] = useState<Record<string, boolean>>({});

  // useEffect to fetch watched status from API on component mount
  useEffect(() => {
    const getInitialData = async () => {
      setIsLoadingWatched(true);
      try {
        const watchedSet = await fetchWatchedVideos();

        const map: Record<string, boolean> = {};
        for (const id of watchedSet) {
          map[id] = true;
        }
        setWatchedMap(map);
      } catch (e) {
        console.error("Failed to fetch watched videos", e);
      } finally {
        setIsLoadingWatched(false);
      }
    };

    getInitialData();
  }, []);

  const markToggle = async (id: string) => {
    const wasWatched = !!watchedMap[id];
    setWatchedMap((prev) => ({ ...prev, [id]: !prev[id] }));

    try {
      const response = await fetch("/api/video/toggle-watch-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoYoutubeId: id }),
      });

      if (!response.ok) {
        throw new Error("Failed to update watch status");
      }
    } catch (error) {
      console.error(error);
      setWatchedMap((prev) => ({ ...prev, [id]: wasWatched }));
      alert("Failed to update status. Please try again.");
    }
  };

  // 3. Update allWatched logic to use initialVideos
  const allWatched = useMemo(
    () =>
      initialVideos.length > 0 &&
      initialVideos.every((v) => watchedMap[v.id]),
    [watchedMap, initialVideos]
  );

  const [showCertModal, setShowCertModal] = useState(false);
  const [certificateName, setCertificateName] = useState("");

  // 4. Handle Empty State (Optional but recommended)
  if (initialVideos.length === 0) {
    return (
      <div className="h-screen bg-black text-gray-100 p-6 flex items-center justify-center">
        <p>No videos found for this course.</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-black text-gray-100 p-6">
      <div className="max-w-screen mx-auto grid grid-cols-12 gap-6 h-full">
        {/* Left - main player and tabs */}
        <div className="col-span-9 bg-gray-800 rounded shadow-lg overflow-y-auto scrollbar-width-none [&::-webkit-scrollbar]:hidden">
          <div className="w-full bg-black flex items-center justify-center relative group cursor-pointer">
            {/* Video Thumbnail & Play Button */}
            <div
              className="w-full aspect-video relative"
              onClick={() =>
                window.open(
                  `https://www.youtube.com/watch?v=${activeVideoId}`,
                  "_blank"
                )
              }
            >
              {activeVideoId && (
                <>
                  <Image
                    src={`https://img.youtube.com/vi/${activeVideoId}/maxresdefault.jpg`}
                    alt="Video Thumbnail"
                    fill
                    className="object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-12 h-12 text-white fill-white" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Tabs below */}
          <div className="px-6 pt-4 bg-neutral-900">
            <Tabs
              tabs={["Overview", "Resources", "Feedback", "Contribute Notes", "Indepth Notes"]}
              active={activeTab}
              onChange={setActiveTab}
            />

            <div className="py-6 text-gray-200">
              {activeTab === "Overview" && (
                <div>
                  <h3 className="text-lg font-semibold">Overview</h3>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="p-4 bg-neutral-800 rounded">
                      <div className="text-xs text-gray-400">Total Videos</div>
                      <div className="text-lg font-semibold">
                        {/* REPLACED MOCK_VIDEOS */}
                        {initialVideos.length}
                      </div>
                    </div>

                    <div className="p-4 bg-neutral-800 rounded">
                      <div className="text-xs text-gray-400">Progress</div>
                      <div className="text-lg font-semibold">
                        {/* REPLACED MOCK_VIDEOS and added safe division */}
                        {Math.round(
                          (Object.values(watchedMap).filter(Boolean).length /
                            (initialVideos.length || 1)) * 100
                        ) || 0}
                        %
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      disabled={!allWatched}
                      onClick={() => setShowCertModal(true)}
                      className={`px-4 py-2 rounded ${allWatched
                        ? "bg-orange-500 hover:bg-orange-400"
                        : "bg-neutral-800 cursor-not-allowed"
                        }`}
                    >
                      Generate Certificate
                    </button>
                    {!allWatched && (
                      <div className="text-xs text-gray-400 mt-2">
                        Complete all videos to enable certificate generation.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Other tabs content remains the same... */}
              {activeTab === "Resources" && (
                <div>
                  <h3 className="text-lg font-semibold">Resources</h3>
                  <p className="text-sm text-gray-300 mt-2">Coming Soon!!</p>
                </div>
              )}

              {activeTab === "Feedback" && (
                <div>
                  <h3 className="text-lg font-semibold">Feedback</h3>
                  <p className="text-sm text-gray-300 mt-2">Coming Soon!!</p>
                </div>
              )}

              {activeTab === "Contribute Notes" && (
                <div>
                  <h3 className="text-lg font-semibold">Contribute Notes</h3>
                  <p className="text-sm text-gray-300 mt-2">Coming Soon!!</p>
                </div>
              )}

              {activeTab === "Indepth Notes" && (
                <div>
                  <h3 className="text-lg font-semibold">Indepth Notes</h3>
                  <p className="text-sm text-gray-300 mt-2">Coming Soon!!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right - sidebar */}
        <aside className="col-span-3 overflow-y-auto scrollbar-width-none [&::-webkit-scrollbar]:hidden">
          <div className="top-6">
            <div className="bg-[#0b0b0c] rounded p-0">
              {isLoadingWatched && (
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-neutral-800 rounded-md w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-neutral-800 rounded-md w-1/2 animate-pulse"></div>
                  <div className="h-4 bg-neutral-800 rounded-md w-5/6 animate-pulse"></div>
                </div>
              )}

              {!isLoadingWatched &&
                sections.map((sec) => (
                  <Accordion
                    key={sec.title}
                    title={`${sec.title} (${sec.videos.length})`}
                    defaultOpen={false}
                  >
                    <div className="space-y-2">
                      {sec.videos.map((v) => (
                        <div
                          key={v.id}
                          className="flex items-center justify-between"
                        >
                          <button
                            onClick={() => setActiveVideoId(v.id)}
                            className={`
                              text-sm text-left rounded-md
                              flex items-center gap-2.5
                              transition-all duration-200 ease-in-out
                              border-l-2 cursor-pointer hover:underline
                              p-2
                              ${activeVideoId === v.id
                                ? "border-white text-white font-semibold bg-white-500/10"
                                : "border-transparent text-neutral-400"
                              }
                            `}
                          >
                            {activeVideoId === v.id ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-4 h-4 flex-shrink-0"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm6.39-2.908a.75.75 0 0 1 .766.027l3.5 2.25a.75.75 0 0 1 0 1.262l-3.5 2.25A.75.75 0 0 1 8 12.25v-4.5a.75.75 0 0 1 .39-.658Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              <span className="w-4 h-4 flex-shrink-0"></span>
                            )}
                            <span>{v.title}</span>
                          </button>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => markToggle(v.id)}
                              disabled={isLoadingWatched}
                              className={`group relative text-xs px-3 py-1 rounded-md border transition-all duration-300 font-medium
                                ${watchedMap[v.id]
                                  ? "border-green-500/60 bg-green-500/10 text-green-400 hover:bg-green-500/20 hover:text-green-300 cursor-pointer"
                                  : "border-neutral-700 bg-[#0b0b0c] text-neutral-400 hover:bg-neutral-800/80 hover:text-white cursor-pointer"
                                } 
                                active:scale-95 overflow-hidden
                                ${isLoadingWatched
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                                }`}
                            >
                              <span
                                className={`absolute inset-0 rounded-md opacity-0 group-hover:opacity-10 transition-opacity duration-300
                                  ${watchedMap[v.id] ? "bg-green-400" : "bg-white"}
                                `}
                              ></span>

                              <span className="relative flex items-center gap-1.5">
                                {watchedMap[v.id] ? (
                                  <>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      className="w-3.5 h-3.5 text-green-400 group-hover:text-green-300 transition-colors"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.704 5.29a.75.75 0 0 1 .006 1.06l-7.25 7.5a.75.75 0 0 1-1.08.02L3.29 8.75a.75.75 0 0 1 1.06-1.06l4.01 3.99 6.72-6.39a.75.75 0 0 1 1.06.006Z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                    Watched
                                  </>
                                ) : (
                                  <>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors"
                                    >
                                      <path d="M10 4.5a.75.75 0 0 1 .75.75v4h4a.75.75 0 0 1 0 1.5h-4v4a.75.75 0 0 1-1.5 0v-4h-4a.75.75 0 0 1 0-1.5h4v-4A.75.75 0 0 1 10 4.5Z" />
                                    </svg>
                                    Mark
                                  </>
                                )}
                              </span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Accordion>
                ))}

              <div className="mt-4 text-xs text-gray-400">
                Complete all videos, assignments, projects, and quizzes to
                finish your quest and unlock your certificate.
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Certificate Modal */}
      {showCertModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded max-w-lg w-full p-6">
            <h3 className="text-lg font-semibold">Generate Certificate</h3>
            <p className="text-sm text-gray-300 mt-2">
              Enter the name to appear on the certificate.
            </p>
            <input
              value={certificateName}
              onChange={(e) => setCertificateName(e.target.value)}
              placeholder="Your full name"
              className="mt-4 w-full p-2 bg-gray-900 border border-gray-700 rounded text-gray-100"
            />
            <div className="mt-4 flex gap-2 justify-end">
              <button
                onClick={() => setShowCertModal(false)}
                className="px-4 py-2 rounded bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  generateCertificateImage(certificateName || "Learner");
                  setShowCertModal(false);
                }}
                className="px-4 py-2 rounded bg-orange-500"
              >
                Download Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
