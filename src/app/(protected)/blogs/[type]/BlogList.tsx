"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { usePathname } from "next/navigation"; // 1. Import usePathname
import { toggleReadStatus } from "@/app/actions";

// This type should match the data structure from your page component
type BlogWithReadStatus = {
  id: number;
  title: string;
  slug: string; // Ensure your DB query provides this
  type: string;
  hasRead: boolean;
};

type BlogListProps = {
  blogs: BlogWithReadStatus[];
};

export function BlogList({ blogs }: BlogListProps) {
  return (
    <div className="mt-8 space-y-4">
      {blogs.map((blog) => (
        <BlogItem key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

// Sub-component for individual blog items
function BlogItem({ blog }: { blog: BlogWithReadStatus }) {
  const [hasRead, setHasRead] = useState(blog.hasRead);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname(); // 2. Get the current path

  const handleToggleRead = () => {
    // Optimistic UI update
    setHasRead((prev) => !prev);

    startTransition(async () => {
      // 3. Pass the pathname to the server action
      const result = await toggleReadStatus(blog.id, hasRead, pathname);
      
      if (!result.success) {
        // Revert on failure
        setHasRead(hasRead);
        alert(result.error || "Failed to update status.");
      }
    });
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
      <Link
        href={`/blog/post/${blog.slug}`} // Adjust if your blog post route is different
        className="text-lg font-medium text-blue-400 hover:underline"
      >
        {blog.title}
      </Link>
      <button
        onClick={handleToggleRead}
        disabled={isPending}
        className={`p-2 rounded-full transition-colors ${
          hasRead
            ? "bg-green-600 text-white"
            : "bg-gray-600 text-gray-300 hover:bg-gray-500"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
        aria-label={hasRead ? "Mark as unread" : "Mark as read"}
      >
        <CheckIcon className="w-5 h-5" />
      </button>
    </div>
  );
}

// SVG Check Icon component (no changes needed)
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}