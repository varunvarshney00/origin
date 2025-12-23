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
      const userActivity = await db
        .select({
          date: sql<string>`TO_CHAR(${userWatchedVideos.createdAt}, 'YYYY-MM-DD')`,
          count: count(userWatchedVideos.videoId),
        })
        .from(userWatchedVideos)
        .where(
          and(
            eq(userWatchedVideos.userId, userId),
            gte(userWatchedVideos.createdAt, yearStartDate),
            lte(userWatchedVideos.createdAt, yearEndDate)
          )
        )
        .groupBy(sql`TO_CHAR(${userWatchedVideos.createdAt}, 'YYYY-MM-DD')`);

      const formattedData = userActivity.map((day) => ({
        date: day.date,
        count: Number(day.count),
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
