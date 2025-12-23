    // app/api/video/toggle-watch-status/route.ts
    import { NextResponse } from "next/server";
    import { toggleWatchStatus } from "@/lib/actions/videos";
    import { auth } from "@/lib/auth"; // Your Better Auth instance
    import { headers } from "next/headers";

    export async function POST(request: Request) {
    try {
        // 1. Authenticate the user using Better Auth
        const session = await auth.api.getSession({
        headers: await headers()
        });
        
        if (!session || !session.user || !session.user.id) {
        return new NextResponse("Unauthorized", { status: 401 });
        }
        
        const userId = session.user.id;

        // 2. Parse the request body
        const body = await request.json();
        const { videoYoutubeId } = body;

        if (!videoYoutubeId || typeof videoYoutubeId !== "string") {
        return new NextResponse("Invalid request: videoYoutubeId is required.", {
            status: 400,
        });
        }

        // 3. Call the server action
        const result = await toggleWatchStatus(userId, videoYoutubeId);

        // 4. Handle the result
        if (result.status === "error") {
        return new NextResponse(JSON.stringify(result), { status: 500 });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error("[TOGGLE_WATCH_API]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
    }