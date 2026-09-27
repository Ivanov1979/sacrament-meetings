import { getMeetingById } from "@/lib/meetings-db";

interface RouteContext {
    params: Promise<{
        id: string;
    }>;
}

export async function GET(
    request: Request,
    context: RouteContext
) {
    try {
        const { id } = await context.params;

        const meetingId = Number(id);

        if (!Number.isInteger(meetingId)) {
            return Response.json(
                {
                    error: "Invalid meeting ID",
                },
                {
                    status: 400,
                }
            );
        }

        // Fetch the meeting from the Neon PostgreSQL database.
        const meeting = await getMeetingById(meetingId);

        if (!meeting) {
            return Response.json(
                {
                    error: "Meeting not found",
                },
                {
                    status: 404,
                }
            );
        }

        return Response.json(meeting, {
            status: 200,
        });
    } catch (error) {
        console.error("Error loading meeting:", error);

        return Response.json(
            {
                error: "Unable to load meeting.",
            },
            {
                status: 500,
            }
        );
    }
}