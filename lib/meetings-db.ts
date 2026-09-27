import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting } from "./types";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
}

const sql = neon(databaseUrl);

/**
 * Represents a meeting row as returned by PostgreSQL.
 *
 * PostgreSQL DATE values may be returned as Date objects,
 * so the date property accepts both Date and string.
 */
interface MeetingRow {
    id: number;
    date: string | Date;
    meeting_type: SacramentMeeting["meetingType"];
    presiding: string;
    conducting: string;
    announcements: SacramentMeeting["announcements"];
    opening_hymn: SacramentMeeting["openingHymn"];
    opening_prayer: string;
    ward_business: SacramentMeeting["wardBusiness"];
    stake_business: boolean;
    sacrament_hymn: SacramentMeeting["sacramentHymn"];
    speakers: SacramentMeeting["speakers"];
    closing_hymn: SacramentMeeting["closingHymn"];
    closing_prayer: string;
}

/**
 * Converts a PostgreSQL DATE value into the YYYY-MM-DD
 * format expected by the application.
 */
function normalizeDate(date: string | Date): string {
    if (date instanceof Date) {
        return date.toISOString().split("T")[0];
    }

    return String(date).split("T")[0];
}

/**
 * Converts a PostgreSQL database row into the SacramentMeeting
 * structure used throughout the application.
 */
function mapMeeting(row: MeetingRow): SacramentMeeting {
    return {
        id: row.id,
        date: normalizeDate(row.date),
        meetingType: row.meeting_type,
        presiding: row.presiding,
        conducting: row.conducting,
        announcements: row.announcements,
        openingHymn: row.opening_hymn,
        openingPrayer: row.opening_prayer,
        wardBusiness: row.ward_business,
        stakeBusiness: row.stake_business,
        sacramentHymn: row.sacrament_hymn,
        speakers: row.speakers,
        closingHymn: row.closing_hymn,
        closingPrayer: row.closing_prayer,
    };
}

/**
 * Returns all sacrament meetings.
 *
 * If a date is supplied, only meetings matching that
 * date are returned.
 */
export async function getMeetings(
    date?: string | null
): Promise<SacramentMeeting[]> {
    let rows;

    if (date) {
        rows = await sql`
            SELECT *
            FROM meetings
            WHERE date = ${date}
            ORDER BY date DESC
        `;
    } else {
        rows = await sql`
            SELECT *
            FROM meetings
            ORDER BY date DESC
        `;
    }

    return (rows as unknown as MeetingRow[]).map(mapMeeting);
}

/**
 * Returns one sacrament meeting using its database ID.
 */
export async function getMeetingById(
    id: number
): Promise<SacramentMeeting | null> {
    const rows = await sql`
        SELECT *
        FROM meetings
        WHERE id = ${id}
        LIMIT 1
    `;

    const meeting = (rows as unknown as MeetingRow[])[0];

    return meeting ? mapMeeting(meeting) : null;
}