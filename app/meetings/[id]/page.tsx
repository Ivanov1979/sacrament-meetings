"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";

import MeetingDetail from "@/components/MeetingDetail";
import PrintButton from "@/components/PrintButton";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function MeetingPage({
    params,
}: MeetingPageProps) {
    const { id } = use(params);

    const [meeting, setMeeting] =
        useState<SacramentMeeting | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadMeeting() {
            try {
                const response = await fetch(`/api/meetings/${id}`);

                if (!response.ok) {
                    throw new Error("Meeting not found.");
                }

                const data: SacramentMeeting = await response.json();
                setMeeting(data);
            } catch {
                setError("Unable to load this meeting.");
            } finally {
                setLoading(false);
            }
        }

        loadMeeting();
    }, [id]);

    if (loading) {
        return (
            <main>
                <p role="status">Loading meeting...</p>
            </main>
        );
    }

    if (error || !meeting) {
        return (
            <main>
                <p role="alert">
                    {error || "Meeting not found."}
                </p>

                <Link
                    href="/meetings"
                    className="mt-4 inline-block font-medium text-slate-700 hover:underline"
                >
                    ← Back to meetings
                </Link>
            </main>
        );
    }

    return (
        <main>
            <div className="mb-6 flex items-center justify-between gap-4 print:hidden">
                <Link
                    href="/meetings"
                    className="font-medium text-slate-700 hover:underline"
                >
                    ← Back to meetings
                </Link>

                <PrintButton />
            </div>

            <MeetingDetail meeting={meeting} />
        </main>
    );
}