"use client";

import Sidebar from "@/components/sidebar";
import { CoursesCardAPI } from "@/constant/coursesCards";
import CoursesCardComponent from "@/modules/courses/ui";

const Course = () => {
  return (
    <div className="flex min-h-screen bg-[#09090B]">
      <div className="w-65">
        <Sidebar />
      </div>
      <div className="flex-1 p-6">
        <h1 className="text-white text-2xl mb-6 font-bold text-left">
          Courses
        </h1>

        {/* --- CARDS CONTAINER: Changed from grid to a simple div for a list view --- */}
        <div className="flex flex-col max-w-7xl">
          {CoursesCardAPI.map((card) => (
            <CoursesCardComponent key={card.id} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Course;
