"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db/index";
import { userReadBlogs } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

/**
 * Toggles the read status of a blog for the current user.
 * @param blogId - The ID of the blog to update.
 * @param hasRead - The current read status of the blog.
 * @param path - The path of the page to revalidate after the action.
 */

export async function toggleReadStatus(
  blogId: number,
  hasRead: boolean,
  path: string
) {
  // 3. Get the session using the correct method from the docs
  const session = await auth.api.getSession({
    headers: await headers(), // Pass the request headers to the function
  });

  if (!session?.user?.id) {
    return { success: false, error: "Authentication required" };
  }

  const userId = session.user.id;

  try {
    if (hasRead) {
      // If it's already read, unmark it by deleting the record
      await db
        .delete(userReadBlogs)
        .where(
          and(
            eq(userReadBlogs.userId, userId),
            eq(userReadBlogs.blogId, blogId)
          )
        );
    } else {
      // If it's not read, mark it as read by inserting a record
      await db.insert(userReadBlogs).values({ userId, blogId }).onConflictDoNothing();
    }

    revalidatePath(path);

    return { success: true };
    
  } catch (error) {
    console.error("Failed to toggle read status:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
