"use server";

import { db } from "@/db";
import { courses, userEnrolledCourses, userWatchedVideos } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq, and, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { calculateProgress } from "../utils";

export async function enrollUser(courseType: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    const course = await db.query.courses.findFirst({
        where: eq(courses.type, courseType),
    });

    if (!course) {
        throw new Error("Course not found");
    }

    // Check if already enrolled
    const existingEnrollment = await db.query.userEnrolledCourses.findFirst({
        where: and(
            eq(userEnrolledCourses.userId, session.user.id),
            eq(userEnrolledCourses.courseId, course.id)
        ),
    });

    if (existingEnrollment) {
        return { success: true, message: "Already enrolled" };
    }

    await db.insert(userEnrolledCourses).values({
        userId: session.user.id,
        courseId: course.id,
    });

    revalidatePath(`/courses/${courseType}`);
    revalidatePath(`/courses`); // Revalidate list page too

    return { success: true };
}

export async function getUserEnrollmentStatus(courseType: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return { isEnrolled: false };
    }

    const course = await db.query.courses.findFirst({
        where: eq(courses.type, courseType),
    });

    if (!course) {
        return { isEnrolled: false };
    }

    const enrollment = await db.query.userEnrolledCourses.findFirst({
        where: and(
            eq(userEnrolledCourses.userId, session.user.id),
            eq(userEnrolledCourses.courseId, course.id)
        ),
    });

    return { isEnrolled: !!enrollment };
}

export async function getUserCourseProgress(courseType: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return { progress: 0 };
    }

    // 1. Get the course
    const course = await db.query.courses.findFirst({
        where: eq(courses.type, courseType),
        with: {
            videos: true, // Get all videos for this course
        },
    });

    if (!course || !course.videos || course.videos.length === 0) {
        return { progress: 0 };
    }

    const totalVideos = course.videos.length;

    // 2. Get the enrollment (optional, but good to check if we only want progress for enrolled users)
    const enrollment = await db.query.userEnrolledCourses.findFirst({
        where: and(
            eq(userEnrolledCourses.userId, session.user.id),
            eq(userEnrolledCourses.courseId, course.id)
        ),
    });

    if (!enrollment) return { progress: 0 };

    // 3. Get watched videos count for this course
    // We can filter userWatchedVideos where videoId is in the list of course.videos
    // However, Drizzle might allow a more direct query if relations are set up.
    // Let's do a simple count for now.

    const courseVideoIds = course.videos.map(v => v.id);

    // Guard: If course has no videos, avoid doing a query with empty array
    if (courseVideoIds.length === 0) {
        return { progress: 0, watchedCount: 0, totalVideos: 0 };
    }

    const watched = await db.query.userWatchedVideos.findMany({
        where: and(
            eq(userWatchedVideos.userId, session.user.id),
            inArray(userWatchedVideos.videoId, courseVideoIds)
        ),
    });

    const watchedCount = watched.length;
    const progress = calculateProgress(watchedCount, totalVideos);

    return { progress, watchedCount, totalVideos };
}
