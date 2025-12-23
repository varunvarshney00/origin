import React from 'react';

// A simple Check icon component. You can keep it here or import it.
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5 text-neutral-500"
  >
    <path
      fillRule="evenodd"
      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z"
      clipRule="evenodd"
    />
  </svg>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CourseSidebar({ course: CoursesCardAPI }: { course: any }) {
  // Dummy course data for demonstration.
  // The component will use `propCourse` if it's passed, otherwise it will use this example.
  const course = CoursesCardAPI || {
    what_you_ll_learn: [
      'Master the fundamentals of a new skill.',
      'Build and deploy a production-ready project.',
      'Understand advanced concepts and best practices.',
    ],
    course_price: ['$99.99'],
    lectures: '52',
    level: 'Intermediate',
  };

  return (
    <aside className="space-y-4 max-w-sm mx-auto">
      {/* Main Information Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 text-slate-100">
        {/* "What you'll learn" Section */}
        <div>
          <h2 className="text-lg font-semibold">What you&apos;ll learn</h2>
          <ul className="mt-4 space-y-3">
            {course.what_you_ll_learn.map((item: string, idx: number) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="flex-shrink-0 mt-0.5">
                  <CheckIcon />
                </span>
                <p className="text-sm text-neutral-400 leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Divider & Call-to-Action Section */}
        <div className="mt-6 pt-6 border-t border-neutral-800">
          <div className="text-center">
            <div className="text-sm text-neutral-400">Course Price</div>
            <p className="mt-1 text-2xl font-bold">{course.course_price[0]}</p>
          </div>

          <a
            href="#start"
            className="block w-full text-center px-4 py-3 mt-4 rounded-lg bg-slate-100 text-slate-900 font-medium text-sm hover:bg-slate-200 transition-colors"
          >
            Start Learning Now
          </a>

          <div className="mt-6 text-sm">
            <strong className="text-slate-200">This course includes:</strong>
            <ul className="mt-2 space-y-2 text-xs text-neutral-400">
              <li>• A complete playlist of in-depth video lectures</li>
              <li>• Source code and project files for all lessons</li>
              <li>• Lifetime free access</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Small Meta Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-neutral-400">Lectures</span>
          <span className="font-medium text-slate-200">{course.lectures}</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-neutral-400">Level</span>
          <span className="font-medium text-slate-200">{course.level}</span>
        </div>
      </div>
    </aside>
  );
}