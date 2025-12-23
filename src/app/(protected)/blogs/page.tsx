"use client";

import React from "react";
import BlogCardComponent from "@/modules/blogs/ui";
import { BlogCardAPI } from "@/constant/blogsCards";
import Sidebar from "@/components/sidebar";

const Page: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar */}
      {/* Use your existing sidebar width utility `w-65` if defined; otherwise replace with w-[260px] */}
      <aside className="w-65 hidden lg:block">
        <Sidebar />
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header (optional) */}
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-white">Blogs</h1>
          </header>

          {/* Vertical list of horizontal cards */}
          <section className="flex flex-col">
            {BlogCardAPI.map((card) => (
              <BlogCardComponent key={card.id} {...card} />
            ))}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Page;
