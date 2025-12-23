// scripts/seed.ts
import { db } from "@/db"; // Your Drizzle client
import { courses, videos } from "@/db/schema";
import { MOCK_VIDEOS } from "@/constant/courseContent"; // Import your mock data

async function main() {
  console.log("Seeding database...");

  // 1. Create your course first
  // We assume you have a 'courses' table as in your schema
  const course = await db
    .insert(courses)
    .values({
      title: "React Course (from MOCK_VIDEOS)",
      type: "react-main", // Must be unique
      description: "The main React course.",
    })
    .onConflictDoNothing() // Prevents duplicate courses
    .returning({ id: courses.id });

  const courseId = course[0]?.id;

  if (!courseId) {
    console.log("Course already exists. Using existing course.");
    // This is a simple example; in a real app, you'd fetch the existing courseId
    // For this script, we'll just assume it's 1 if it fails
    // const existingCourse = await db.query.courses.findFirst({ where: eq(courses.type, "react-main") });
    // courseId = existingCourse.id;
    console.error("Could not create or find course. Aborting.");
    return;
  }

  console.log(`Using courseId: ${courseId}`);

  // 2. Map your mock videos to the database schema
  const videosToInsert = MOCK_VIDEOS.map((video) => ({
    title: video.title,
    youtubeId: video.id, // Map the 'id' from mock to 'youtubeId'
    youtubeUrl: `https://www.youtube.com/watch?v=${video.id}`,
    courseId: courseId,
  }));

  // 3. Insert all videos into the database
  console.log(`Inserting ${videosToInsert.length} videos...`);
  await db.insert(videos).values(videosToInsert).onConflictDoNothing(); // onConflict requires a unique constraint

  console.log("Database seeded successfully!");
}

main().catch((e) => {
  console.error("Failed to seed database:", e);
  process.exit(1);
});