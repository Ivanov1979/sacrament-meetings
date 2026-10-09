
import { signOut } from "@/auth";

export function SignOutButton() {
    return (
        <form
            action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
            }}
        >
            <button
                type="submit"
                className="rounded-md bg-red-700 px-4 py-2 text-white hover:bg-red-800"
            >
                Sign Out
            </button>
        </form>
    );
}
