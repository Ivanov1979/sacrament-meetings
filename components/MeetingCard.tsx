import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
    meeting: SacramentMeeting;
}

export default function MeetingCard({
    meeting,
}: MeetingCardProps) {
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
        timeZone: "UTC",
    }).format(new Date(`${meeting.date}T00:00:00Z`));

    return (
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                {meeting.meetingType}
            </p>

            <h2 className="mt-2 text-xl font-bold text-slate-900">
                {formattedDate}
            </h2>

            <div className="mt-4 space-y-1 text-slate-700">
                <p>
                    <span className="font-semibold">Presiding:</span>{" "}
                    {meeting.presiding}
                </p>

                <p>
                    <span className="font-semibold">Conducting:</span>{" "}
                    {meeting.conducting}
                </p>
            </div>

            <Link
                href={`/meetings/${meeting.id}`}
                className="mt-5 inline-block rounded-md bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-700"
            >
                View Program
            </Link>
        </article>
    );
}