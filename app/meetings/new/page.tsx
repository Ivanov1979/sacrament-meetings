import Link from "next/link";

import MeetingForm from "@/components/meetings/MeetingForm";
import { createMeeting } from "@/lib/actions";

export default function NewMeetingPage() {
    return (
        <main>
            <div className="mb-8">
                <Link
                    href="/meetings"
                    className="font-medium text-slate-700 hover:underline"
                >
                    ← Back to meetings
                </Link>

                <h1 className="mt-4 text-3xl font-bold text-slate-900">
                    Create Sacrament Meeting
                </h1>

                <p className="mt-2 text-slate-600">
                    Enter the information for the new meeting.
                </p>
            </div>

            <MeetingForm
                action={createMeeting}
                submitLabel="Create Meeting"
            />
        </main>
    );
}