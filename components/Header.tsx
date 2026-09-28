export default function Header() {
    const currentDate = new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
    }).format(new Date());

    return (
        <header className="bg-slate-900 px-6 py-5 text-white">
            <div className="mx-auto flex max-w-6xl flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold">
                        Sacrament Meeting Planner
                    </h1>
                    <p className="text-sm text-slate-300">
                        Alto Hospicio Ward
                    </p>
                </div>

                <p className="text-sm text-slate-300">
                    {currentDate}
                </p>
            </div>
        </header>
    );
}