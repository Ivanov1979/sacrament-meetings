import type { SacramentMeeting } from "./types";

const meetings: SacramentMeeting[] = [
    {
        id: 1,
        date: "2026-09-13",
        meetingType: "regular",
        presiding: "Bishop rojas",
        conducting: "Brother Lara ",
        announcements: [
            "Ward temple night this Saturday",
            "Youth activity on Wednesday at 7:00 PM",
        ],
        openingHymn: {
            number: 2,
            title: "The Spirit of God",
        },
        openingPrayer: "Sister Williams",
        wardBusiness: [
            {
                description: "Sustaining of a new Primary teacher",
            },
        ],
        stakeBusiness: false,
        sacramentHymn: {
            number: 169,
            title: "In Remembrance of Thy Suffering",
        },
        speakers: [
            {
                name: "Sister Sanchez",
                topic: "Faith in Jesus Christ",
                type: "speaker",
            },
            {
                name: "Brother Catalan",
                topic: "Service",
                type: "speaker",
            },
        ],
        closingHymn: {
            number: 31,
            title: "O God, Our Help in Ages Past",
        },
        closingPrayer: "Brother Garate",
    },

    {
        id: 2,
        date: "2026-09-06",
        meetingType: "testimony",
        presiding: "Bishop Rojas",
        conducting: "Brother Pineda",
        announcements: ["Fast offering collection after the meeting"],
        openingHymn: {
            number: 85,
            title: "How Firm a Foundation",
        },
        openingPrayer: "Brother Rojas",
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: {
            number: 196,
            title: "Jesus, Once of Humble Birth",
        },
        speakers: [
            {
                name: "Ward Members",
                topic: "Fast and testimony meeting",
                type: "speaker",
            },
        ],
        closingHymn: {
            number: 152,
            title: "God Be with You Till We Meet Again",
        },
        closingPrayer: "Sister Aldunate",
    },

    {
        id: 3,
        date: "2026-08-30",
        meetingType: "regular",
        presiding: "President Yañez",
        conducting: "Brother Rojas",
        announcements: ["Ward service project next Saturday"],
        openingHymn: {
            number: 6,
            title: "Redeemer of Israel",
        },
        openingPrayer: "Sister Catalan",
        wardBusiness: [
            {
                description: "Release and sustaining of Sunday School teachers",
            },
        ],
        stakeBusiness: false,
        sacramentHymn: {
            number: 172,
            title: "In Humility, Our Savior",
        },
        speakers: [
            {
                name: "Brother Martin",
                topic: "Following Jesus Christ",
                type: "speaker",
            },
            {
                name: "Young Women Choir",
                topic: "Sacred musical selection",
                type: "musical-number",
            },
            {
                name: "Sister Pineda",
                topic: "Personal Revelation",
                type: "speaker",
            },
        ],
        closingHymn: {
            number: 301,
            title: "I Am a Child of God",
        },
        closingPrayer: "Brother Campos",
    },

    {
        id: 4,
        date: "2026-08-23",
        meetingType: "stake",
        presiding: "President Yañez",
        conducting: "President Rivas",
        announcements: ["Stake conference sessions this weekend"],
        openingHymn: {
            number: 27,
            title: "Praise to the Man",
        },
        openingPrayer: "Sister Araya",
        wardBusiness: [],
        stakeBusiness: true,
        sacramentHymn: {
            number: 169,
            title: "In Remembrance of Thy Suffering",
        },
        speakers: [
            {
                name: "President Johnson",
                topic: "Strengthening Families",
                type: "speaker",
            },
            {
                name: "Stake Choir",
                topic: "Sacred musical selection",
                type: "musical-number",
            },
        ],
        closingHymn: {
            number: 134,
            title: "I Believe in Christ",
        },
        closingPrayer: "Brother Montecinos",
    },

    {
        id: 5,
        date: "2026-08-16",
        meetingType: "general",
        presiding: "President Rivas",
        conducting: "Brother Lara",
        announcements: ["General conference broadcast"],
        openingHymn: {
            number: 21,
            title: "Come, Listen to a Prophet's Voice",
        },
        openingPrayer: " <brother Campos",
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: {
            number: 174,
            title: "While of These Emblems We Partake",
        },
        speakers: [
            {
                name: "General Authorities",
                topic: "General Conference",
                type: "speaker",
            },
        ],
        closingHymn: {
            number: 89,
            title: "The Lord Is My Light",
        },
        closingPrayer: " Sister of Mercy",
    },
];

export function getMeetings(
    date?: string | null
): SacramentMeeting[] {
    if (date) {
        return meetings.filter((meeting) => meeting.date === date);
    }

    return meetings;
}

export function getMeetingById(
    id: number
): SacramentMeeting | null {
    return meetings.find((meeting) => meeting.id === id) ?? null;
}