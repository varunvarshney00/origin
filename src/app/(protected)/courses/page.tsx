import Sidebar from "@/components/sidebar";
import { CoursesCardAPI } from "@/constant/coursesCards";
import { getUserEnrollmentStatus, getUserCourseProgress } from "@/lib/actions/user-course";
import CoursesCardComponent from "@/modules/courses/ui";

const Course = async () => {
  // Parallel fetch for all courses data would be better for performance
  const coursesWithData = await Promise.all(
    CoursesCardAPI.map(async (card) => {
      // In the real app, "type" matches logic in schema/actions. 
      // Assumption: card.id corresponds to the course 'type' in DB.
      // If card.id is not 'type', we might need a mapping, but let's assume it is for now (e.g. 'master-java').

      const { isEnrolled } = await getUserEnrollmentStatus(card.id);
      const { progress, watchedCount, totalVideos } = await getUserCourseProgress(card.id);

      return {
        ...card,
        isEnrolled,
        progress: progress || 0,
        watchedCount: watchedCount || 0,
        totalVideos: totalVideos || 0,
      };
    })
  );

  return (
    <div className="flex min-h-screen bg-[#09090B]">
      <div className="w-65">
        <Sidebar />
      </div>
      <div className="flex-1 p-6">
        <h1 className="text-white text-2xl mb-6 font-bold text-left">
          Courses
        </h1>

        {/* --- CARDS CONTAINER: Changed from grid to a simple div for a list view --- */}
        <div className="flex flex-col max-w-7xl">
          {coursesWithData.map((card) => (
            <CoursesCardComponent key={card.id} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Course;
