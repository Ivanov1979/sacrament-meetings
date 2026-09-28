import { getMeetings } from "@/lib/meetings-db";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const date = searchParams.get("date");

        // Fetch meetings from the Neon PostgreSQL database.
        const meetings = await getMeetings(date);

        return Response.json(meetings, {
            status: 200,
        });
    } catch (error) {
        console.error("Error loading meetings:", error);

        return Response.json(
            {
                error: "Unable to load meetings.",
            },
            {
                status: 500,
            }
        );
    }
}