import NavLinks from "@/components/NavLinks";

export default function MeetingsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="mx-auto w-full max-w-6xl px-6 py-8">
            <div className="mb-8 border-b border-slate-200 pb-4">
                <NavLinks />
            </div>

            {children}
        </section>
    );
}