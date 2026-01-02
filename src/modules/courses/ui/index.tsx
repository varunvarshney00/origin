"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type CoursesCardProps = {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  instructor: string;
  rating: number;
  reviewsCount: number;
  duration: number;
  lectureCount: number;
  level: string;
  price: number;
  originalPrice: number;
  isBestseller?: boolean;
  isEnrolled?: boolean;
  progress?: number;
  watchedCount?: number;
  totalVideos?: number;
};

const CoursesCardComponent: React.FC<CoursesCardProps> = ({
  id,
  // imageUrl,
  title,
  description,
  instructor,
  // rating,
  // reviewsCount,
  // duration,
  // lectureCount,
  level,
  // price,
  // originalPrice,
  isBestseller,
  isEnrolled,
  progress,
  watchedCount,
  totalVideos,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/courses/${id}`);
  };

  return (
    <article
      onClick={handleClick}
      className="group relative flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-neutral-700 bg-neutral-900/70 hover:shadow-lg hover:shadow-neutral-800/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer w-full mb-5 hover:bg-neutral-800/70 items-center"
      aria-label={title}
    >
      {/* --- Course Image --- */}
      <div className="relative h-40 w-full sm:h-32 sm:w-52 overflow-hidden rounded-lg">
        <Image
          src={"/master-java.png"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300"
        />
      </div>

      {/* --- Course Info --- */}
      <div className="flex-grow">
        <h2 className="text-lg font-semibold text-white leading-snug line-clamp-2">
          {title}
        </h2>

        <p className="text-sm text-neutral-400 mt-1 line-clamp-2 hidden md:block">
          {description}
        </p>

        <p className="text-xs text-neutral-500 mt-2">
          Your instructor: {instructor}
        </p>

        {/* Rating & Meta */}
        <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-neutral-400">
          {/* <span className="text-yellow-400 font-semibold">{rating.toFixed(1)}</span> */}
          {/* <span className="text-neutral-500">({reviewsCount.toLocaleString()})</span> */}
          {/* <span className="hidden sm:inline">•</span> */}
          {/* <span>{duration} hrs</span> */}
          {/* <span>•</span> */}
          {/* <span>{lectureCount} lectures</span> */}
          <span>•</span>
          <span>{level}</span>
        </div>

        {/* Bestseller */}
        {isEnrolled ? (
          <div className="flex items-start gap-1 mt-2">
            <span className="inline-block text-[10px] uppercase font-semibold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">
              {progress}% Completed
            </span>
            <span className="inline-block text-[10px] uppercase font-semibold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">
              {watchedCount}/{totalVideos} Lectures
            </span>
          </div>
        ) : (
          isBestseller && (
            <span className="inline-block mt-2 text-[10px] uppercase font-semibold bg-neutral-100 text-neutral-900 px-2 py-0.5 rounded">
              Bestseller
            </span>
          )
        )}

      </div>

      {/* --- Price --- */}
      {/* <div className="sm:ml-auto flex flex-col items-start sm:items-end justify-center mt-2 sm:mt-0"> */}
      {/* <p className="text-base font-bold text-white">₹{price}</p> */}
      {/* <p className="text-sm text-neutral-500 line-through">₹{originalPrice}</p> */}
      {/* </div> */}
    </article>
  );
};

export default CoursesCardComponent;
