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
 * Input used when creating or updating a meeting.
 * The database generates the meeting ID.
 */
export type MeetingInput = Omit<SacramentMeeting, "id">;

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

/**
 * Creates a new sacrament meeting.
 */
export async function createMeeting(
    meeting: MeetingInput
): Promise<SacramentMeeting> {
    const rows = await sql`
        INSERT INTO meetings (
            date,
            meeting_type,
            presiding,
            conducting,
            announcements,
            opening_hymn,
            opening_prayer,
            ward_business,
            stake_business,
            sacrament_hymn,
            speakers,
            closing_hymn,
            closing_prayer
        )
        VALUES (
            ${meeting.date},
            ${meeting.meetingType},
            ${meeting.presiding},
            ${meeting.conducting},
            ${JSON.stringify(meeting.announcements ?? [])}::jsonb,
            ${JSON.stringify(meeting.openingHymn)}::jsonb,
            ${meeting.openingPrayer},
            ${JSON.stringify(meeting.wardBusiness)}::jsonb,
            ${meeting.stakeBusiness},
            ${JSON.stringify(meeting.sacramentHymn)}::jsonb,
            ${JSON.stringify(meeting.speakers)}::jsonb,
            ${JSON.stringify(meeting.closingHymn)}::jsonb,
            ${meeting.closingPrayer}
        )
        RETURNING *
    `;

    const row = (rows as unknown as MeetingRow[])[0];

    return mapMeeting(row);
}

/**
 * Updates an existing sacrament meeting.
 */
export async function updateMeeting(
    id: number,
    meeting: MeetingInput
): Promise<SacramentMeeting | null> {
    const rows = await sql`
        UPDATE meetings
        SET
            date = ${meeting.date},
            meeting_type = ${meeting.meetingType},
            presiding = ${meeting.presiding},
            conducting = ${meeting.conducting},
            announcements =
                ${JSON.stringify(meeting.announcements ?? [])}::jsonb,
            opening_hymn =
                ${JSON.stringify(meeting.openingHymn)}::jsonb,
            opening_prayer = ${meeting.openingPrayer},
            ward_business =
                ${JSON.stringify(meeting.wardBusiness)}::jsonb,
            stake_business = ${meeting.stakeBusiness},
            sacrament_hymn =
                ${JSON.stringify(meeting.sacramentHymn)}::jsonb,
            speakers =
                ${JSON.stringify(meeting.speakers)}::jsonb,
            closing_hymn =
                ${JSON.stringify(meeting.closingHymn)}::jsonb,
            closing_prayer = ${meeting.closingPrayer}
        WHERE id = ${id}
        RETURNING *
    `;

    const row = (rows as unknown as MeetingRow[])[0];

    return row ? mapMeeting(row) : null;
}

/**
 * Deletes a sacrament meeting by its database ID.
 */
export async function deleteMeeting(
    id: number
): Promise<boolean> {
    const rows = await sql`
        DELETE FROM meetings
        WHERE id = ${id}
        RETURNING id
    `;

    return rows.length > 0;
}