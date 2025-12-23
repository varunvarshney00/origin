"use server";

import { db } from "@/db/index";
import { videos, userWatchedVideos } from "@/db/schema";
import { and, eq } from "drizzle-orm";

/**
 * Fetches a Set of watched YouTube IDs for a given user.
 * We use a Set for fast O(1) lookups on the client.
 */
export async function getWatchedVideosSet(
  userId: string
): Promise<Set<string>> {
  if (!userId) {
    return new Set();
  }

  try {
    const watched = await db
      .select({
        youtubeId: videos.youtubeId,
      })
      .from(userWatchedVideos)
      .innerJoin(videos, eq(userWatchedVideos.videoId, videos.id))
      .where(eq(userWatchedVideos.userId, userId));

    // Return a Set of the YouTube IDs (e.g., "_rTCzxg6VmM")
    return new Set(watched.map((v) => v.youtubeId));
  } catch (error) {
    console.error("Failed to fetch watched videos:", error);
    return new Set();
  }
}

/**
 * Toggles the watch status of a video for a user.
 * It finds the video's internal ID (integer) from its YouTube ID (string).
 *
 * @returns {Promise<{ status: 'watched' | 'unwatched' | 'error', message: string }>}
 */
export async function toggleWatchStatus(
  userId: string,
  videoYoutubeId: string
) {
  if (!userId || !videoYoutubeId) {
    return { status: "error", message: "Invalid input." };
  }

  try {
    // 1. Find the internal video ID (integer) from the public YouTube ID (string)
    const video = await db
      .select({ id: videos.id })
      .from(videos)
      .where(eq(videos.youtubeId, videoYoutubeId))
      .limit(1);

    if (!video || video.length === 0) {
      return { status: "error", message: "Video not found." };
    }

    const videoId = video[0].id;

    // 2. Check if the "watched" entry already exists
    const existingEntry = await db
      .select({ userId: userWatchedVideos.userId })
      .from(userWatchedVideos)
      .where(
        and(
          eq(userWatchedVideos.userId, userId),
          eq(userWatchedVideos.videoId, videoId)
        )
      )
      .limit(1);

    // 3. If it exists, delete it (unwatch)
    if (existingEntry.length > 0) {
      await db
        .delete(userWatchedVideos)
        .where(
          and(
            eq(userWatchedVideos.userId, userId),
            eq(userWatchedVideos.videoId, videoId)
          )
        );
      return { status: "unwatched", message: "Video marked as unwatched." };
    }

    // 4. If it doesn't exist, create it (watch)
    await db.insert(userWatchedVideos).values({
      userId: userId,
      videoId: videoId,
    });

    return { status: "watched", message: "Video marked as watched." };
  } catch (error) {
    console.error("Failed to toggle watch status:", error);
    return { status: "error", message: "An unexpected error occurred." };
  }
}