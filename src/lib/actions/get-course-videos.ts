"use server";

import { db } from "@/db/index";
import { videos, courses } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { Video } from "@/constant/courseContent";

export async function getVideosForCourse(courseTypeSlug: string): Promise<Video[]> {
  try {
    const result = await db
      .select({
        // Select specific fields from videos table
        youtubeId: videos.youtubeId,
        title: videos.title,
        section: videos.section,
        sequence: videos.sequence,
      })
      .from(videos)
      .innerJoin(courses, eq(videos.courseId, courses.id)) // Join videos with courses
      .where(eq(courses.type, courseTypeSlug)) // Filter by the course "type" (slug)
      .orderBy(asc(videos.sequence)); // Sort by sequence number

    // Map to the frontend Video type
    return result.map((v) => ({
      id: v.youtubeId, // Map DB 'youtubeId' to Frontend 'id'
      title: v.title,
      section: v.section,
    }));
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
}