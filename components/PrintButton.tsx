"use client";

export default function PrintButton() {
    return (
        <button
            type="button"
            onClick={() => window.print()}
            className="rounded-md bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-700"
        >
            Print Program
        </button>
    );
}