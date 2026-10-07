"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import {
    createMeeting as createMeetingDb,
    updateMeeting as updateMeetingDb,
    deleteMeeting as deleteMeetingDb,
    getMeetingById,
    type MeetingInput,
} from "@/lib/meetings-db";

/**
 * Zod schema used to validate meeting form data.
 *
 * Because this file uses "use server", the schema is intentionally
 * NOT exported. A "use server" module may only export async functions.
 */
const MeetingFormSchema = z.object({
    date: z.string().min(1, "Meeting date is required."),

    meetingType: z.enum([
        "testimony",
        "regular",
        "stake",
        "general",
    ]),

    presiding: z
        .string()
        .trim()
        .min(1, "Presiding officer is required."),

    conducting: z
        .string()
        .trim()
        .min(1, "Conducting officer is required."),

    openingHymnNumber: z.coerce
        .number()
        .int()
        .positive("Opening hymn number is required."),

    openingHymnTitle: z
        .string()
        .trim()
        .min(1, "Opening hymn title is required."),

    openingPrayer: z
        .string()
        .trim()
        .min(1, "Opening prayer is required."),

    sacramentHymnNumber: z.coerce
        .number()
        .int()
        .positive("Sacrament hymn number is required."),

    sacramentHymnTitle: z
        .string()
        .trim()
        .min(1, "Sacrament hymn title is required."),

    closingHymnNumber: z.coerce
        .number()
        .int()
        .positive("Closing hymn number is required."),

    closingHymnTitle: z
        .string()
        .trim()
        .min(1, "Closing hymn title is required."),

    closingPrayer: z
        .string()
        .trim()
        .min(1, "Closing prayer is required."),

    stakeBusiness: z.boolean(),
});

/**
 * Converts validated form data into the structure expected
 * by the database layer.
 */
function buildMeetingInput(
    data: z.infer<typeof MeetingFormSchema>
): MeetingInput {
    return {
        date: data.date,
        meetingType: data.meetingType,
        presiding: data.presiding,
        conducting: data.conducting,

        announcements: [],

        openingHymn: {
            number: data.openingHymnNumber,
            title: data.openingHymnTitle,
        },

        openingPrayer: data.openingPrayer,

        wardBusiness: [],

        stakeBusiness: data.stakeBusiness,

        sacramentHymn: {
            number: data.sacramentHymnNumber,
            title: data.sacramentHymnTitle,
        },

        speakers: [],

        closingHymn: {
            number: data.closingHymnNumber,
            title: data.closingHymnTitle,
        },

        closingPrayer: data.closingPrayer,
    };
}

/**
 * Creates a new sacrament meeting.
 */
export async function createMeeting(
    formData: FormData
): Promise<void> {
    const validatedFields = MeetingFormSchema.safeParse({
        date: formData.get("date"),
        meetingType: formData.get("meetingType"),
        presiding: formData.get("presiding"),
        conducting: formData.get("conducting"),

        openingHymnNumber:
            formData.get("openingHymnNumber"),

        openingHymnTitle:
            formData.get("openingHymnTitle"),

        openingPrayer:
            formData.get("openingPrayer"),

        sacramentHymnNumber:
            formData.get("sacramentHymnNumber"),

        sacramentHymnTitle:
            formData.get("sacramentHymnTitle"),

        closingHymnNumber:
            formData.get("closingHymnNumber"),

        closingHymnTitle:
            formData.get("closingHymnTitle"),

        closingPrayer:
            formData.get("closingPrayer"),

        stakeBusiness:
            formData.get("stakeBusiness") === "on",
    });

    if (!validatedFields.success) {
        console.error(
            "Meeting validation failed:",
            validatedFields.error.flatten()
        );

        throw new Error(
            "Unable to create meeting. Please check the form fields."
        );
    }

    try {
        const meeting = buildMeetingInput(
            validatedFields.data
        );

        await createMeetingDb(meeting);
    } catch (error) {
        console.error(
            "Unable to create meeting:",
            error
        );

        throw new Error(
            "Unable to create meeting. Please try again."
        );
    }

    revalidatePath("/meetings");

    redirect("/meetings");
}

/**
 * Updates an existing sacrament meeting.
 *
 * The current meeting is loaded first so fields that are
 * not included in the edit form are preserved.
 */
export async function updateMeeting(
    id: number,
    formData: FormData
): Promise<void> {
    if (!Number.isInteger(id) || id <= 0) {
        throw new Error("Invalid meeting ID.");
    }

    const validatedFields = MeetingFormSchema.safeParse({
        date: formData.get("date"),
        meetingType: formData.get("meetingType"),
        presiding: formData.get("presiding"),
        conducting: formData.get("conducting"),

        openingHymnNumber:
            formData.get("openingHymnNumber"),

        openingHymnTitle:
            formData.get("openingHymnTitle"),

        openingPrayer:
            formData.get("openingPrayer"),

        sacramentHymnNumber:
            formData.get("sacramentHymnNumber"),

        sacramentHymnTitle:
            formData.get("sacramentHymnTitle"),

        closingHymnNumber:
            formData.get("closingHymnNumber"),

        closingHymnTitle:
            formData.get("closingHymnTitle"),

        closingPrayer:
            formData.get("closingPrayer"),

        stakeBusiness:
            formData.get("stakeBusiness") === "on",
    });

    if (!validatedFields.success) {
        console.error(
            "Meeting validation failed:",
            validatedFields.error.flatten()
        );

        throw new Error(
            "Unable to update meeting. Please check the form fields."
        );
    }

    try {
        /*
         * Get the existing meeting before updating it.
         * This prevents fields that are not present in
         * the form from being erased.
         */
        const existingMeeting =
            await getMeetingById(id);

        if (!existingMeeting) {
            throw new Error("Meeting not found.");
        }

        const formMeeting = buildMeetingInput(
            validatedFields.data
        );

        const meeting: MeetingInput = {
            ...formMeeting,

            /*
             * Preserve information that the current
             * meeting form does not edit.
             */
            announcements:
                existingMeeting.announcements ?? [],

            wardBusiness:
                existingMeeting.wardBusiness,

            speakers:
                existingMeeting.speakers,
        };

        const updatedMeeting =
            await updateMeetingDb(
                id,
                meeting
            );

        if (!updatedMeeting) {
            throw new Error("Meeting not found.");
        }
    } catch (error) {
        console.error(
            "Unable to update meeting:",
            error
        );

        throw new Error(
            "Unable to update meeting. Please try again."
        );
    }

    revalidatePath("/meetings");
    revalidatePath(`/meetings/${id}`);

    redirect("/meetings");
}

/**
 * Deletes an existing sacrament meeting.
 */
export async function deleteMeeting(
    id: number
): Promise<void> {
    if (!Number.isInteger(id) || id <= 0) {
        throw new Error("Invalid meeting ID.");
    }

    try {
        const deleted =
            await deleteMeetingDb(id);

        if (!deleted) {
            throw new Error("Meeting not found.");
        }
    } catch (error) {
        console.error(
            "Unable to delete meeting:",
            error
        );

        throw new Error(
            "Unable to delete meeting. Please try again."
        );
    }

    revalidatePath("/meetings");
}