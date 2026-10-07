import type { SacramentMeeting } from "@/lib/types";

interface MeetingFormProps {
    action: (formData: FormData) => void | Promise<void>;
    meeting?: SacramentMeeting;
    submitLabel?: string;
}

export default function MeetingForm({
    action,
    meeting,
    submitLabel = "Save Meeting",
}: MeetingFormProps) {
    return (
        <form
            action={action}
            className="mx-auto max-w-3xl space-y-6 rounded-lg bg-white p-6 shadow"
        >
            <div>
                <label
                    htmlFor="date"
                    className="mb-2 block font-medium text-slate-700"
                >
                    Meeting Date
                </label>

                <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    defaultValue={meeting?.date ?? ""}
                    className="w-full rounded-md border border-slate-300 p-2"
                />
            </div>

            <div>
                <label
                    htmlFor="meetingType"
                    className="mb-2 block font-medium text-slate-700"
                >
                    Meeting Type
                </label>

                <select
                    id="meetingType"
                    name="meetingType"
                    required
                    defaultValue={meeting?.meetingType ?? "regular"}
                    className="w-full rounded-md border border-slate-300 p-2"
                >
                    <option value="regular">Regular</option>
                    <option value="testimony">Testimony</option>
                    <option value="stake">Stake</option>
                    <option value="general">General</option>
                </select>
            </div>

            <div>
                <label
                    htmlFor="presiding"
                    className="mb-2 block font-medium text-slate-700"
                >
                    Presiding
                </label>

                <input
                    id="presiding"
                    name="presiding"
                    type="text"
                    required
                    defaultValue={meeting?.presiding ?? ""}
                    className="w-full rounded-md border border-slate-300 p-2"
                />
            </div>

            <div>
                <label
                    htmlFor="conducting"
                    className="mb-2 block font-medium text-slate-700"
                >
                    Conducting
                </label>

                <input
                    id="conducting"
                    name="conducting"
                    type="text"
                    required
                    defaultValue={meeting?.conducting ?? ""}
                    className="w-full rounded-md border border-slate-300 p-2"
                />
            </div>

            <fieldset className="space-y-4 rounded-md border border-slate-200 p-4">
                <legend className="px-2 font-semibold text-slate-800">
                    Opening Hymn
                </legend>

                <div>
                    <label
                        htmlFor="openingHymnNumber"
                        className="mb-2 block font-medium text-slate-700"
                    >
                        Hymn Number
                    </label>

                    <input
                        id="openingHymnNumber"
                        name="openingHymnNumber"
                        type="number"
                        min="1"
                        required
                        defaultValue={meeting?.openingHymn.number ?? ""}
                        className="w-full rounded-md border border-slate-300 p-2"
                    />
                </div>

                <div>
                    <label
                        htmlFor="openingHymnTitle"
                        className="mb-2 block font-medium text-slate-700"
                    >
                        Hymn Title
                    </label>

                    <input
                        id="openingHymnTitle"
                        name="openingHymnTitle"
                        type="text"
                        required
                        defaultValue={meeting?.openingHymn.title ?? ""}
                        className="w-full rounded-md border border-slate-300 p-2"
                    />
                </div>
            </fieldset>

            <div>
                <label
                    htmlFor="openingPrayer"
                    className="mb-2 block font-medium text-slate-700"
                >
                    Opening Prayer
                </label>

                <input
                    id="openingPrayer"
                    name="openingPrayer"
                    type="text"
                    required
                    defaultValue={meeting?.openingPrayer ?? ""}
                    className="w-full rounded-md border border-slate-300 p-2"
                />
            </div>

            <div className="flex items-center gap-3">
                <input
                    id="stakeBusiness"
                    name="stakeBusiness"
                    type="checkbox"
                    defaultChecked={meeting?.stakeBusiness ?? false}
                    className="h-4 w-4"
                />

                <label
                    htmlFor="stakeBusiness"
                    className="font-medium text-slate-700"
                >
                    Stake Business
                </label>
            </div>

            <fieldset className="space-y-4 rounded-md border border-slate-200 p-4">
                <legend className="px-2 font-semibold text-slate-800">
                    Sacrament Hymn
                </legend>

                <div>
                    <label
                        htmlFor="sacramentHymnNumber"
                        className="mb-2 block font-medium text-slate-700"
                    >
                        Hymn Number
                    </label>

                    <input
                        id="sacramentHymnNumber"
                        name="sacramentHymnNumber"
                        type="number"
                        min="1"
                        required
                        defaultValue={meeting?.sacramentHymn.number ?? ""}
                        className="w-full rounded-md border border-slate-300 p-2"
                    />
                </div>

                <div>
                    <label
                        htmlFor="sacramentHymnTitle"
                        className="mb-2 block font-medium text-slate-700"
                    >
                        Hymn Title
                    </label>

                    <input
                        id="sacramentHymnTitle"
                        name="sacramentHymnTitle"
                        type="text"
                        required
                        defaultValue={meeting?.sacramentHymn.title ?? ""}
                        className="w-full rounded-md border border-slate-300 p-2"
                    />
                </div>
            </fieldset>

            <fieldset className="space-y-4 rounded-md border border-slate-200 p-4">
                <legend className="px-2 font-semibold text-slate-800">
                    Closing Hymn
                </legend>

                <div>
                    <label
                        htmlFor="closingHymnNumber"
                        className="mb-2 block font-medium text-slate-700"
                    >
                        Hymn Number
                    </label>

                    <input
                        id="closingHymnNumber"
                        name="closingHymnNumber"
                        type="number"
                        min="1"
                        required
                        defaultValue={meeting?.closingHymn.number ?? ""}
                        className="w-full rounded-md border border-slate-300 p-2"
                    />
                </div>

                <div>
                    <label
                        htmlFor="closingHymnTitle"
                        className="mb-2 block font-medium text-slate-700"
                    >
                        Hymn Title
                    </label>

                    <input
                        id="closingHymnTitle"
                        name="closingHymnTitle"
                        type="text"
                        required
                        defaultValue={meeting?.closingHymn.title ?? ""}
                        className="w-full rounded-md border border-slate-300 p-2"
                    />
                </div>
            </fieldset>

            <div>
                <label
                    htmlFor="closingPrayer"
                    className="mb-2 block font-medium text-slate-700"
                >
                    Closing Prayer
                </label>

                <input
                    id="closingPrayer"
                    name="closingPrayer"
                    type="text"
                    required
                    defaultValue={meeting?.closingPrayer ?? ""}
                    className="w-full rounded-md border border-slate-300 p-2"
                />
            </div>

            <button
                type="submit"
                className="rounded-md bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700"
            >
                {submitLabel}
            </button>
        </form>
    );
}
