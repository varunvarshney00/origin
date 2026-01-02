import { notFound } from "next/navigation";

export type Course = {
  imageUrl: string;
  level: string;
  lectures: number;
  title: string;
  authors: string;
  description: string;
  type: string;
  course_content: Record<string, string[]>,
  what_you_ll_learn: string[]
  course_price: string[]
  this_course_includes: string[]
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

// function to get a single course by its type
export async function getCourseByType(type: string): Promise<Course> {
  const res = await fetch(`${API_BASE_URL}/courses/${type}`);

  if (!res.ok) notFound();

  return res.json();
}

// function to get all courses
export async function getAllCourses(): Promise<Course[]> {
  const res = await fetch(`${API_BASE_URL}/courses`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }

  return res.json();
}
