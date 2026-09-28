"use client";

import { useEffect, useState } from "react";
import MeetingCard from "@/components/MeetingCard";
import type { SacramentMeeting } from "@/lib/types";

export default function MeetingsPage() {
    const [meetings, setMeetings] = useState<SacramentMeeting[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadMeetings() {
            try {
                const response = await fetch("/api/meetings");

                if (!response.ok) {
                    throw new Error("Failed to load meetings.");
                }

                const data: SacramentMeeting[] = await response.json();
                setMeetings(data);
            } catch {
                setError("Unable to load meetings.");
            } finally {
                setLoading(false);
            }
        }

        loadMeetings();
    }, []);

    if (loading) {
        return (
            <main>
                <p role="status">Loading meetings...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main>
                <p role="alert">{error}</p>
            </main>
        );
    }

    return (
        <main>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">
                    Sacrament Meetings
                </h1>

                <p className="mt-2 text-slate-600">
                    View current and past meeting programs.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {meetings.map((meeting) => (
                    <MeetingCard
                        key={meeting.id}
                        meeting={meeting}
                    />
                ))}
            </div>
        </main>
    );
}