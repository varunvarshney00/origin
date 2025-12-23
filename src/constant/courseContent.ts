export type Video = {
  id: string; // youtube id
  title: string;
  // durationSeconds: number;
  section: string;
};

export const MOCK_VIDEOS: Video[] = [
  // Introduction
  { id: "Tn6-PIqc4UM", title: "Episode -1", section: "Introduction" },
  { id: "_rTCzxg6VmM", title: "Episode 0", section: "Introduction" },
  { id: "EsdfHKhiK-g", title: "Episode 1", section: "Introduction" },

  // Why React / Conceptual
  { id: "bRc63wrDaUg", title: "Episode 2", section: "React Concepts" },
  { id: "k-jHi0USEQM", title: "Episode 3", section: "React Concepts" },
  { id: "_ze46JgZpd4", title: "Episode 4", section: "React Concepts" },
  { id: "DOu5CJzo8rY", title: "Episode 5", section: "React Concepts" },

  // Ecosystem / Choosing tools
  { id: "h_TGiSZnwz8", title: "Episode 6", section: "Ecosystem & Tooling" },
  { id: "3Yah9eBZwM0", title: "Episode 7", section: "Ecosystem & Tooling" },

  // JSX / Rendering / Elements
  { id: "Ps_6LcVhERs", title: "Episode 8", section: "JSX & Rendering" },
  { id: "TUsVCNr7HnY", title: "Episode 9", section: "Components" },
  { id: "P98-YCZ7h2k", title: "Episode 10", section: "Assets & Media" },

  // Events / State / Props
  { id: "Yj2UB6NcMiw", title: "Episode 11", section: "Event Handling" },
  { id: "iKWeMeeZdio", title: "Episode 12", section: "State & Props" },
  { id: "FhBQsUZOc8c", title: "Episode 13", section: "State & Props" },
  { id: "R5KmPOYxpss", title: "Episode 14", section: "State & Props" },

  // Small Concepts / Utilities
  { id: "6IU7VCVyy-M", title: "Episode 15", section: "Small Concepts" },
  { id: "mo6EC4Q91ZY", title: "Episode 16", section: "Small Concepts" },
  { id: "taSooNO2S4c", title: "Episode 17", section: "Conditional UI" },

  // Styling / CSS
  { id: "YjB5LaJTR5c", title: "Episode 18", section: "Styling & CSS" },

  // Projects / Hands-on
  { id: "tlHyG8fAEHs", title: "Episode 19", section: "Projects (Hands-on)" },
  { id: "SP9T988eaWM", title: "Episode 20", section: "Projects (Hands-on)" },

  // Hooks (useEffect / useRef / custom hooks)
  { id: "6s-YLyidW8U", title: "Episode 21", section: "Hooks" },
  { id: "eXYnWED_1dI", title: "Episode 22", section: "Routing" },
  { id: "jMbAk9btszU", title: "Episode 23", section: "Routing" },
  { id: "qqybka4RSJ0", title: "Episode 24", section: "Data Fetching" },

  // UX / Loading states
  { id: "FEtTRjq1P6I", title: "Episode 25", section: "UX Patterns" },

  // Inter-page communication / Dark mode
  {
    id: "5m64-0vnLYU",
    title: "Episode 26",
    section: "Routing & State Sharing",
  },
  { id: "nffHTpPeSoY", title: "Episode 27", section: "Theming (Dark Mode)" },

  // Context / Custom hooks / Reuse
  { id: "oANamKAxvmw", title: "Episode 28", section: "Context API" },
  {
    id: "PMyPyT8N4m8",
    title: "Episode 28.1",
    section: "useReducer React Hook",
  },
  { id: "WYNB0GTdB3U", title: "Episode 29", section: "Custom Hooks" },

  // Projects / Completed apps
  { id: "8N-FOwUAxEE", title: "Episode 30", section: "Projects (Completed)" },

  // Deployment / Hosting
  { id: "1Anti-9NU5I", title: "Episode 31", section: "Deployment" },

  // Forms / Controlled components
  { id: "OWi1TwVDGR8", title: "Episode 32", section: "Forms" },
  { id: "4gHnFthACk8", title: "Episode 33", section: "Forms" },

  // Refs / Validation / Advanced form UX
  { id: "PiHMQWiqUpU", title: "Episode 34", section: "Hooks (useRef)" },
  { id: "qsCW7pRZylk", title: "Episode 35", section: "Form Validation" },
  { id: "w2ebVv_Rp7M", title: "Episode 36", section: "Advanced Forms" },

  // Utilities / Filtering / Context menus
  {
    id: "QaYWYJ9OuQE",
    title: "Episode 37",
    section: "Custom Hooks & Utilities",
  },
  { id: "oBwE5XTry1k", title: "Episode 38", section: "UI Patterns" },

  // CRUD / Sorting / LocalStorage
  { id: "heNvLg2B7mQ", title: "Episode 39", section: "CRUD Patterns" },
  { id: "Y2VX9aL9N8M", title: "Episode 40", section: "Data Manipulation" },
  {
    id: "5uHikv1oBEI",
    title: "Episode 41",
    section: "Persistence (LocalStorage)",
  },

  // Devtools / Styling tips
  { id: "x21hfU-Lm-U", title: "Episode 42", section: "Debugging & DevTools" },
  { id: "21E9M0NhqUA", title: "Episode 43", section: "Styling (Tailwind)" },

  // Router helpers / Portals
  { id: "2RvXYLrKuFA", title: "Episode 44", section: "Routing Helpers" },
  { id: "aIzNpTE3Or0", title: "Episode 45", section: "Portals & UI Patterns" },

  // Performance (Code splitting / Lazy) & Advanced topics
  {
    id: "fzLTHk4wr6E",
    title: "Episode 46",
    section: "Performance & Code Splitting",
  },
  {
    id: "gKs1J6RIGpg",
    title: "Episode 47",
    section: "Class Components (Legacy)",
  },
  { id: "qC4CJ3hBvWE", title: "Episode 48", section: "Lifecycle Methods" },

  // Misc (this, HOCs, building libraries, hooks reimplementation)
  { id: "pbiTm0vSa6k", title: "Episode 49", section: "This Binding" },
  {
    id: "rl88xVwMFwE",
    title: "Episode 50",
    section: "Higher-Order Components",
  },
  { id: "yYDWtNu0kmw", title: "Episode 51", section: "Libraries & Extensions" },
  {
    id: "LSD_d4_4bQE",
    title: "Episode 52",
    section: "Internals (recreating useState)",
  },
  {
    id: "jiziEC8dPSE",
    title: "Episode 53",
    section: "Internals (Virtual DOM & Reconciliation)",
  },

  // Conclusion
  {
    id: "eat4R5_o7Eo",
    title: "Episode 54 - Congratulations 🎉",
    section: "Conclusion",
  },
];

export const SIDEBAR_SECTIONS = [
  { key: "live", title: "Live Class Recordings" },
  { key: "py-basic", title: "PYTHON - Basic Building" },
  { key: "py-data", title: "PYTHON - Data Structures" },
  { key: "functions", title: "Functions" },
  { key: "oops", title: "OOPS" },
];
