
import { notFound } from "next/navigation";
import { coursesData } from "@/constant/coursesData";

export type Course = {
  imageUrl: string;
  level: string;
  lectures: string | number;
  title: string;
  authors: string;
  description: string;
  type: string;
  course_content: Record<string, string[]>;
  what_you_ll_learn: string[];
  course_price: string[];
  this_course_includes?: string[];
};

// function to get a single course by its type
export async function getCourseByType(type: string): Promise<Course> {
  // Simulate async delay if needed, or just return directly
  // const res = await fetch(`${API_BASE_URL}/courses/${type}`);
  const course = coursesData.find((c) => c.type === type) as unknown as Course;

  if (!course) notFound();

  return course;
}

// function to get all courses
export async function getAllCourses(): Promise<Course[]> {
  // const res = await fetch(`${API_BASE_URL}/courses`, {
  //   next: { revalidate: 3600 },
  // });

  return coursesData as unknown as Course[];
}

