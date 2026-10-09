
import Link from "next/link";
import { auth } from "@/auth";
import { SignOutButton } from "@/components/sign-out-button";

export async function AuthStatus() {
    const session = await auth();

    if (!session?.user) {
        return (
            <Link href="/login">
                Sign In
            </Link>
        );
    }

    return (
        <div className="flex items-center gap-4">
            <span>
                Welcome, {session.user.name ?? session.user.email}
            </span>

            <SignOutButton />
        </div>
    );
}
