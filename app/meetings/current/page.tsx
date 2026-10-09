
import Link from "next/link";
import { getMeetings } from "@/lib/meetings-db";

export const dynamic = "force-dynamic";

export default async function CurrentMeetingPage() {
    try {
        const today = new Date().toISOString().split("T")[0];
        const meetings = await getMeetings(today);
        const currentMeeting = meetings[0];

        return (
            <main className="mx-auto max-w-4xl px-6 py-10">
                <h1 className="mb-6 text-3xl font-bold">
                    Current Sacrament Meeting
                </h1>

                {!currentMeeting ? (
                    <div className="rounded-lg border p-6">
                        <p>No sacrament meeting is scheduled for today.</p>
                        <Link
                            href="/meetings"
                            className="mt-4 inline-block text-blue-600 underline"
                        >
                            View all meetings
                        </Link>
                    </div>
                ) : (
                    <div className="rounded-lg border p-6">
                        <h2 className="mb-4 text-2xl font-semibold">
                            Today's Meeting
                        </h2>

                        <p className="mb-4">
                            A sacrament meeting is scheduled for today.
                        </p>

                        <Link
                            href="/meetings"
                            className="text-blue-600 underline"
                        >
                            View meeting details
                        </Link>
                    </div>
                )}
            </main>
        );
    } catch (error) {
        console.error("Error loading current meeting:", error);

        return (
            <main className="mx-auto max-w-4xl px-6 py-10">
                <h1 className="mb-6 text-3xl font-bold">
                    Current Sacrament Meeting
                </h1>

                <p className="text-red-600">
                    Unable to load the current meeting.
                    Please try again later.
                </p>

                <Link
                    href="/meetings"
                    className="mt-4 inline-block text-blue-600 underline"
                >
                    View all meetings
                </Link>
            </main>
        );
    }
}
