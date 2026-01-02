import React from "react";
import { getCourseByType } from "@/lib/data";
import Image from "next/image";
import Accordion from "@/modules/courses/components/accordion";
import CheckIcon from "@/modules/courses/components/checkIcon";
import Link from "next/link";
import { getUserEnrollmentStatus } from "@/lib/actions/user-course";
import { EnrollButton } from "@/modules/courses/ui/enroll-button";

type CourseDetailsPageProps = {
  params: Promise<{
    type: string;
  }>;
};


const CourseDetailPage = async ({ params }: CourseDetailsPageProps) => {
  const { type } = await params;
  const course = await getCourseByType(type);
  const { isEnrolled } = await getUserEnrollmentStatus(type);


  if (!course) {
    return (
      <main className="min-h-screen bg-black text-white p-8 md:p-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold">Course not found</h1>
          <p className="mt-2 text-gray-400">
            Please check the course identifier.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Main content (spans 2 cols on md) */}
        <section className="md:col-span-2 space-y-6">
          <div className="overflow-hidden shadow-lg bg-[#0b0b0c] border border-[#242426] rounded-xl">
            {/* Image container */}
            <div className="relative w-full h-64 md:h-[420px]">
              <Image
                src="/master-java.png"
                alt={course.title}
                fill
                sizes="(max-width: 768px) 100vw, 700px"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>

            {/* Below the image area */}
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-4xl font-extrabold leading-tight">
                    {course.title}
                  </h1>
                  {/* <p className="text-sm text-gray-400 mt-1">
                    Authors: {course.authors}
                  </p> */}
                </div>
              </div>

              <p className="mt-4 text-gray-300 leading-relaxed">
                {course.description}
              </p>

              <div className="mt-6">
                {/* <h3 className="text-sm text-gray-400 uppercase tracking-wide">
                  Course Content
                </h3> */}
                <div className="mt-3">
                  <Accordion content={course.course_content} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* -----------------------------------------------------------------------------------*/}
        {/* Right: Sidebar */}
        <aside className="space-y-4">
          {/* Main Information Card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 text-slate-100">
            {/* First section */}
            <div>
              <h2 className="text-lg font-semibold">What you&apos;ll learn</h2>
              <ul className="mt-2">
                {course.what_you_ll_learn.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5">
                      <CheckIcon />
                    </span>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Second section */}
            <div className="pt-6">
              <h2 className="text-lg font-semibold">Course Price</h2>
              <ul className="mt-2">
                {course.course_price.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5">
                      <CheckIcon />
                    </span>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Third section */}
            <div className="pt-6">
              <h2 className="text-lg font-semibold">This course includes</h2>
              <ul className="mt-2">
                {course.this_course_includes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5">
                      <CheckIcon />
                    </span>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Start learning button */}
            <EnrollButton
              courseType={String(course?.type)}
              isEnrolled={isEnrolled}
              resumeLink={`/courses/${String(course?.type)}/start-learning`}
            />
          </div>

          {/* Small Meta Card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Lectures</span>
              <span className="font-medium text-slate-200">
                {course.lectures}
              </span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-neutral-400">Skill Level</span>
              <span className="font-medium text-slate-200">{course.level}</span>
            </div>
          </div>
        </aside>
        {/* ------------------------------------------------------------------------------------------------- */}
      </div>
    </main>
  );
};

export default CourseDetailPage;
