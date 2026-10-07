import Link from "next/link";
import { notFound } from "next/navigation";

import MeetingForm from "@/components/meetings/MeetingForm";
import { updateMeeting } from "@/lib/actions";
import { getMeetingById } from "@/lib/meetings-db";

interface EditMeetingPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditMeetingPage({
    params,
}: EditMeetingPageProps) {
    const { id: idParam } = await params;

    const id = Number(idParam);

    if (!Number.isInteger(id) || id <= 0) {
        notFound();
    }

    const meeting = await getMeetingById(id);

    if (!meeting) {
        notFound();
    }

    const updateMeetingWithId =
        updateMeeting.bind(null, id);

    return (
        <main>
            <div className="mb-8">
                <Link
                    href={`/meetings/${id}`}
                    className="font-medium text-slate-700 hover:underline"
                >
                    ← Back to meeting
                </Link>

                <h1 className="mt-4 text-3xl font-bold text-slate-900">
                    Edit Sacrament Meeting
                </h1>

                <p className="mt-2 text-slate-600">
                    Update the information for this meeting.
                </p>
            </div>

            <MeetingForm
                action={updateMeetingWithId}
                meeting={meeting}
                submitLabel="Update Meeting"
            />
        </main>
    );
}