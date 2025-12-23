import { db } from "@/db/index";
import { blogs, userReadBlogs } from "@/db/schema";
import { eq, and, inArray } from "drizzle-orm";
import { BlogList } from "./BlogList";
import { auth } from "@/lib/auth"; // Your auth config
import { headers } from "next/headers";

type BlogTypePageProps = {
  params: Promise<{ type: string }>;
};

export default async function BlogTypePage({ params }: BlogTypePageProps) {
  const {type} = await params;
  const decodedType = decodeURIComponent(type);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;

  const allBlogs = await db.query.blogs.findMany({
    where: eq(blogs.type, decodedType),
    orderBy: (blogs, { desc }) => [desc(blogs.createdAt)],
  });

  if (allBlogs.length === 0) {
    return (
      <main className="min-h-screen p-6 bg-gray-900 text-white">
        <h1 className="text-3xl font-bold capitalize">{decodedType} Blogs</h1>
        <p className="mt-4">No blogs found in this category yet.</p>
      </main>
    );
  }

  let readBlogIds = new Set<number>();

  if (userId && allBlogs.length > 0) {
    const blogIds = allBlogs.map((b) => b.id);
    const readBlogs = await db.query.userReadBlogs.findMany({
      where: and(
        eq(userReadBlogs.userId, userId),
        inArray(userReadBlogs.blogId, blogIds)
      ),
      columns: {
        blogId: true,
      },
    });
    readBlogIds = new Set(readBlogs.map((b) => b.blogId));
  }

  const blogsWithReadStatus = allBlogs.map((blog) => ({
    ...blog,
    hasRead: readBlogIds.has(blog.id),
  }));

  const totalBlogs = allBlogs.length;
  const readCount = readBlogIds.size;

  return (
    <main className="min-h-screen p-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold capitalize">{decodedType} Blogs</h1>
      {userId && (
        <p className="mt-2 text-gray-400">You have read {readCount} out of {totalBlogs} blogs in this categoty.</p>
      )}
      <BlogList blogs={blogsWithReadStatus} />
    </main>
  );
}
