export type BlogCardProps = {
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

export const BlogCardAPI: BlogCardProps[] = [
  {
    id: "modern-frontend-patterns",
    imageUrl: "https://www.cdmi.in/courses@2x/web-developments.webp",
    title: "Modern Frontend Blogs",
    excerpt:
      "A practical tour through current architecture, component patterns and performance optimizations for modern frontend apps.",
    author: "Professionals",
    date: "2025-08-15",
    readTime: 8,
    tags: ["React", "Performance", "Architecture"],
    claps: 420,
    isFeatured: true,
  },
  {
    id: "nodejs-scalability",
    imageUrl: "https://www.cdmi.in/courses@2x/web-developments.webp",
    title: "Scaling Node.js APIs: Practical Guide",
    excerpt:
      "From clustering to observability — patterns and pitfalls when scaling Node-based backends in production.",
    author: "Rohit Mehta",
    date: "2025-07-02",
    readTime: 10,
    tags: ["Node.js", "Backend", "Scalability"],
    claps: 310,
  },
];
