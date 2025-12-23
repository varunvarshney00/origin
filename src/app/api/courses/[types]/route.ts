// src/app/api/courses/[type]/route.ts

import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { courses, videos } from "@/db/schema";
import { eq } from "drizzle-orm";

// Define the expected shape of the response data
export interface CourseWithVideos {
  id: number;
  title: string;
  type: string;
  description: string | null;
  videos: {
    id: number;
    title: string;
    youtubeUrl: string;
  }[];
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  const courseType = (await params).type;

  if (!courseType) {
    return NextResponse.json(
      { error: "Course type is required" },
      { status: 400 }
    );
  }

  try {
    // 1. Find the course by its type
    const courseData = await db.query.courses.findFirst({
      where: eq(courses.type, courseType),
    });

    if (!courseData) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    } // 2. Find all videos associated with that course

    const videoData = await db.query.videos.findMany({
      where: eq(videos.courseId, courseData.id),
      columns: {
        id: true,
        title: true,
        youtubeUrl: true,
      },
    }); // 3. Combine the data and send the response

    const response: CourseWithVideos = {
      ...courseData,
      videos: videoData,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Failed to fetch course data:", error);
    return NextResponse.json(
      { error: "An internal server error occurred" },
      { status: 500 }
    );
  }
}
