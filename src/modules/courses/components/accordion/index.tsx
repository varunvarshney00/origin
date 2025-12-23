"use client";

import React, { useState } from "react";

type AccordionProps = {
  content: Record<string, string[]>;
};

// A rotating chevron icon to indicate the open/closed state.
const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={`w-5 h-5 text-neutral-500 transition-transform duration-300 ${
      isOpen ? "rotate-180" : ""
    }`}
  >
    <path
      fillRule="evenodd"
      d="M5.22 8.22a.75.75
 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
      clipRule="evenodd"
    />
  </svg>
);

const Accordion = ({ content }: AccordionProps) => {
  // --- STATE CHANGE ---
  // Instead of a single string, we now use an array to hold the keys of ALL open sections.
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const allSectionKeys = Object.keys(content);

  // --- LOGIC ---
  // Toggles a single section by adding or removing its key from the state array.
  const handleToggleSection = (key: string) => {
    setOpenKeys(
      (prevKeys) =>
        prevKeys.includes(key)
          ? prevKeys.filter((k) => k !== key) // If key exists, remove it (collapse)
          : [...prevKeys, key] // If key doesn't exist, add it (expand)
    );
  };

  // Expands or collapses all sections at once.
  const handleToggleAll = () => {
    // If the number of open keys is equal to the total number of sections, collapse all.
    // Otherwise, expand all.
    if (openKeys.length === allSectionKeys.length) {
      setOpenKeys([]); // Collapse all
    } else {
      setOpenKeys(allSectionKeys); // Expand all
    }
  };

  const allAreOpen = openKeys.length === allSectionKeys.length;

  return (
    <div className="w-full">

      {/* Expand/Collapse All Controls */}
      <div className="flex justify-end mb-2">
        <button
          onClick={handleToggleAll}
          className="px-3 py-1 text-xs font-medium text-neutral-400 rounded-md hover:bg-neutral-800 hover:text-slate-100 transition-colors hover:cursor-pointer"
        >
          {allAreOpen ? "Collapse All" : "Expand All"}
        </button>
      </div>

      {/* Accordion Items */}
      <div className="space-y-2">
        {allSectionKeys.map((section) => {
          const isOpen = openKeys.includes(section);
          const contentId = `accordion-content-${section.replace(/\s+/g, "-")}`;

          return (
            <div
              key={section}
              className="bg-neutral-900 border border-neutral-800 rounded-lg"
            >
              <button
                onClick={() => handleToggleSection(section)}
                aria-expanded={isOpen}
                aria-controls={contentId}
                className="w-full flex items-center justify-between p-4 text-left text-slate-100 hover:bg-neutral-800/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
              >
                <div>
                  <p className="font-medium capitalize">{section}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {content[section].length} lesson
                    {content[section].length !== 1 ? "s" : ""}
                  </p>
                </div>
                <ChevronIcon isOpen={isOpen} />
              </button>

              <div
                id={contentId}
                aria-hidden={!isOpen}
                className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <ul className="px-4 pb-4 pt-2 space-y-1 border-t border-neutral-800">
                    {content[section].map((item, idx) => (
                      <li key={idx}>
                        <span className="block p-2 text-sm text-neutral-300 rounded-md hover:bg-neutral-800/60">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Accordion;
