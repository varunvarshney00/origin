// app/api/video/get-watched-status/route.ts
import { NextResponse } from "next/server";
import { getWatchedVideosSet } from "@/lib/actions/videos";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  try {
    // 1. Authenticate the user using Better Auth
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user || !session.user.id) {
      // Even if unauthorized, return an empty array
      return NextResponse.json({ watchedIds: [] });
    }
    const userId = session.user.id;

    // 2. Call the server action
    const watchedSet = await getWatchedVideosSet(userId);

    // 3. Return the data (convert Set to array for JSON)
    const watchedIds = Array.from(watchedSet);
    return NextResponse.json({ watchedIds });
  } catch (error) {
    console.error("[GET_WATCHED_API]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
