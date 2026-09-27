import type { SacramentMeeting } from "@/lib/types";

interface MeetingDetailProps {
    meeting: SacramentMeeting;
}

export default function MeetingDetail({
    meeting,
}: MeetingDetailProps) {
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        dateStyle: "full",
        timeZone: "UTC",
    }).format(new Date(`${meeting.date}T00:00:00Z`));

    return (
        <article className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-sm print:shadow-none">
            <header className="border-b border-slate-200 pb-5 text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    {meeting.meetingType} meeting
                </p>

                <h1 className="mt-2 text-3xl font-bold text-slate-900">
                    Sacrament Meeting
                </h1>

                <p className="mt-2 text-slate-600">{formattedDate}</p>
            </header>

            <div className="mt-6 space-y-5 text-slate-700">
                <section>
                    <h2 className="text-lg font-bold text-slate-900">
                        Meeting Leadership
                    </h2>
                    <p>Presiding: {meeting.presiding}</p>
                    <p>Conducting: {meeting.conducting}</p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-slate-900">
                        Announcements
                    </h2>

                    {meeting.announcements?.length ? (
                        <ul className="list-disc pl-5">
                            {meeting.announcements.map((announcement) => (
                                <li key={announcement}>{announcement}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No announcements.</p>
                    )}
                </section>

                <section>
                    <h2 className="text-lg font-bold text-slate-900">
                        Opening
                    </h2>
                    <p>
                        Opening Hymn #{meeting.openingHymn.number}:{" "}
                        {meeting.openingHymn.title}
                    </p>
                    <p>Opening Prayer: {meeting.openingPrayer}</p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-slate-900">
                        Ward Business
                    </h2>

                    {meeting.wardBusiness.length > 0 ? (
                        <ul className="list-disc pl-5">
                            {meeting.wardBusiness.map((item, index) => (
                                <li key={`${item.description}-${index}`}>
                                    {item.description}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No ward business.</p>
                    )}

                    <p className="mt-2">
                        Stake Business: {meeting.stakeBusiness ? "Yes" : "No"}
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-slate-900">
                        Sacrament
                    </h2>
                    <p>
                        Sacrament Hymn #{meeting.sacramentHymn.number}:{" "}
                        {meeting.sacramentHymn.title}
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-slate-900">
                        Speakers and Musical Numbers
                    </h2>

                    <ul className="space-y-2">
                        {meeting.speakers.map((item, index) => (
                            <li key={`${item.name}-${index}`}>
                                <span className="font-semibold">
                                    {item.type === "musical-number"
                                        ? "Musical Number"
                                        : "Speaker"}
                                    :
                                </span>{" "}
                                {item.name}
                                {item.topic ? ` — ${item.topic}` : ""}
                            </li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-slate-900">
                        Closing
                    </h2>
                    <p>
                        Closing Hymn #{meeting.closingHymn.number}:{" "}
                        {meeting.closingHymn.title}
                    </p>
                    <p>Closing Prayer: {meeting.closingPrayer}</p>
                </section>
            </div>
        </article>
    );
}