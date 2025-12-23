"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type BlogCardProps = {
  id: string;
  imageUrl: string;
  title: string;
  excerpt?: string;
  author: string;
  date: string;     // ISO date
  readTime?: number;
  tags?: string[];
  claps?: number;
  isFeatured?: boolean;
};

const BlogCardComponent: React.FC<BlogCardProps> = ({
  id,
  imageUrl,
  title,
  excerpt,
  author,
  date,
  readTime = 5,
  tags = [],
  claps = 0,
  isFeatured = false,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/blogs/${id}`);
  };

  const formattedDate = new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article
      onClick={handleClick}
      className="group relative flex flex-row items-start gap-4 p-4 rounded-xl border border-neutral-700 bg-neutral-900/70 hover:shadow-lg hover:shadow-neutral-800/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer w-full mb-5 hover:bg-neutral-800/70"
      aria-label={title}
    >
      {/* Image (left) */}
      <div className="relative h-36 w-48 flex-shrink-0 overflow-hidden rounded-lg">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content (center) */}
      <div className="flex-grow min-w-0">
        <h2 className="text-lg font-semibold text-white leading-snug line-clamp-2">
          {title}
        </h2>

        {excerpt && (
          <p className="text-sm text-neutral-400 mt-1 line-clamp-2 hidden md:block">
            {excerpt}
          </p>
        )}

        <div className="flex items-center gap-3 mt-2 text-xs text-neutral-400">
          <span className="text-neutral-300">{author}</span>
          <span>•</span>
          <span>{formattedDate}</span>
          <span>•</span>
          <span>{readTime} min read</span>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.slice(0, 4).map((t) => (
              <span
                key={t}
                className="text-[11px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-200 uppercase font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {isFeatured && (
          <span className="inline-block mt-3 text-[10px] uppercase font-semibold bg-yellow-400 text-neutral-900 px-2 py-0.5 rounded">
            Featured
          </span>
        )}
      </div>

      {/* Right-side meta (claps / CTA) */}
      <div className="ml-4 flex flex-col items-start sm:items-end justify-center mt-2 sm:mt-0">
        <p className="text-sm font-bold text-white">{claps} claps</p>
        <p className="text-xs text-neutral-500">Read article →</p>
      </div>
    </article>
  );
};

export default BlogCardComponent;
