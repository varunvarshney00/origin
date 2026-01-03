import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { userWatchedVideos } from "@/db/schema";
import { and, count, eq, gte, lte } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userId = session.user.id;

    const today = new Date();

    const currentYear = today.getFullYear();
    const yearStartDate = new Date(currentYear, 0, 1);
    const yearEndDate = new Date(currentYear, 11, 31);

    try {
      // Fetch raw timestamps instead of grouping in DB
      
      const userActivity = await db
        .select({
          createdAt: userWatchedVideos.createdAt,
        })
        .from(userWatchedVideos)
        .where(
          and(
            eq(userWatchedVideos.userId, userId),
            gte(userWatchedVideos.createdAt, yearStartDate),
            lte(userWatchedVideos.createdAt, yearEndDate)
          )
        );

      // Aggregate in JavaScript with Timezone Adjustment
      const activityMap: Record<string, number> = {};

      userActivity.forEach((log) => {
        if (!log.createdAt) return;

        // Create a date object from the UTC timestamp
        const dateObj = new Date(log.createdAt);

        // Add 5 hours and 30 minutes for IST (Indian Standard Time)
        // 5.5 hours * 60 minutes * 60 seconds * 1000 milliseconds
        const istOffsetMs = 5.5 * 60 * 60 * 1000;
        const istDate = new Date(dateObj.getTime() + istOffsetMs);

        // Format to YYYY-MM-DD
        const dateStr = istDate.toISOString().split("T")[0];

        // Increment count for this date
        activityMap[dateStr] = (activityMap[dateStr] || 0) + 1;
      });

      // Convert map to array format expected by the frontend
      const formattedData = Object.entries(activityMap).map(([date, count]) => ({
        date,
        count,
      }));

      return NextResponse.json(formattedData);
    } catch (error) {
      console.error("Failed to fetch heatmap data: ", error);
      return new NextResponse("Internal server error", { status: 500 });
    }
  } catch (error) {
    console.error("Failed to fetch heatmap data: ", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
