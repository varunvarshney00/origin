import { getVideosForCourse } from "@/lib/actions/get-course-videos";
import CoursePlayer from "./course-player";

interface PageProps {
  params: Promise<{
    type: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { type } = await params;
  const videos = await getVideosForCourse(type);

  return <CoursePlayer initialVideos={videos} />;
}