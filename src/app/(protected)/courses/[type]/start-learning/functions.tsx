import { Video } from "@/constant/courseContent";
import { useState } from "react";

// ----------------------------------------------------------------------------------------------------

export function getSafeYouTubeEmbedUrl(videoId: string) {
  // Only allow YouTube IDs from our data model (never accept raw user URLs)
  const cleanId = encodeURIComponent(videoId);
  return `https://www.youtube.com/embed/${cleanId}?rel=0`; // rel=0 reduces related videos from other channels
}

// ----------------------------------------------------------------------------------------------------

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-100">
      {children}
    </span>
  );
}

// -------------------------------------------------------------------------------------------

export function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: string[];
  active: string;
  onChange: (t: string) => void;
}) {
  return (
    <div className="flex gap-6 border-b border-gray-700">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`pb-3 pt-4 text-sm cursor-pointer focus:outline-none ${
            active === t
              ? "border-b-2 border-orange-400 text-white"
              : "text-gray-300 hover:text-white"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

// -------------------------------------------------------------------------------------------

export function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-neutral-800 rounded mb-3 overflow-hidden">
      <button
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-neutral-900 text-left focus:outline-none cursor-pointer hover:bg-neutral-800"
      >
        <span className="text-sm text-gray-100">{title}</span>
      </button>
      {open && (
        <div className="p-3 bg-[#0b0b0c]  text-gray-200">{children}</div>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------------------------------------

export function VideoCard({
  video,
  watched,
  onWatchToggle,
}: {
  video: Video;
  watched: boolean;
  onWatchToggle: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded hover:bg-gray-900 cursor-pointer">
      <div className="w-20 h-12 bg-black flex items-center justify-center text-xs text-gray-400 border border-gray-700">
        Thumbnail
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-100">{video.title}</div>
            {/* <div className="text-xs text-gray-400">
              {formatDuration(video.durationSeconds)}
            </div> */}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onWatchToggle(video.id)}
              className={`px-2 py-1 text-xs rounded ${
                watched ? "bg-green-700" : "bg-gray-700"
              }`}
            >
              {watched ? "Watched" : "Mark Watched"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------------------------------

export function generateCertificateImage(name: string) {
  // Client-side certificate creator using Canvas
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 800;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // background
  ctx.fillStyle = "#0f1724"; // dark slate
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // border
  ctx.strokeStyle = "#f97316";
  ctx.lineWidth = 8;
  ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

  // title
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 48px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Certificate of Completion", canvas.width / 2, 180);

  // name
  ctx.font = "bold 40px Arial";
  ctx.fillText(name || "[Your Name]", canvas.width / 2, 360);

  // course
  ctx.font = "24px Arial";
  ctx.fillStyle = "#d1d5db";
  ctx.fillText(
    `Completed: Text Summarizer Project using HuggingFace`,
    canvas.width / 2,
    420
  );

  // footer
  ctx.font = "16px Arial";
  ctx.fillStyle = "#9ca3af";
  ctx.fillText(new Date().toLocaleDateString(), canvas.width / 2, 740);

  // trigger download
  const link = document.createElement("a");
  link.download = `certificate-${(name || "user")
    .replace(/\s+/g, "-")
    .toLowerCase()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

// ----------------------------------------------------------------------------------------------------

// Helper function to fetch initial watched video IDs
export async function fetchWatchedVideos(): Promise<Set<string>> {
  try {
    const res = await fetch("/api/video/get-watched-status");
    if (!res.ok) {
      throw new Error("Failed to fetch watched status");
    }
    const data: { watchedIds: string[] } = await res.json();
    return new Set(data.watchedIds);
  } catch (error) {
    console.error("Failed to fetch watched videos:", error);
    return new Set(); 
  }
}

// ----------------------------------------------------------------------------------------------------


