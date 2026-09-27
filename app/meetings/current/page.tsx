import { redirect } from "next/navigation";
import { getMeetings } from "@/lib/meetings-db";

export default async function CurrentMeetingPage() {
    const today = new Date();

    const sunday = new Date(today);
    sunday.setDate(today.getDate() - today.getDay());

    const sundayDate = [
        sunday.getFullYear(),
        String(sunday.getMonth() + 1).padStart(2, "0"),
        String(sunday.getDate()).padStart(2, "0"),
    ].join("-");

    const meetings = await getMeetings(sundayDate);
    const meeting = meetings[0];

    if (!meeting) {
        redirect("/meetings");
    }

    redirect(`/meetings/${meeting.id}`);
}