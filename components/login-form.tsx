
"use client";

import { useActionState } from "react";
import { authenticate } from "@/lib/actions";

export function LoginForm() {
    const [errorMessage, formAction, isPending] =
        useActionState(authenticate, undefined);

    return (
        <form action={formAction} className="space-y-5">
            <div className="space-y-2">
                <label
                    htmlFor="email"
                    className="block font-medium"
                >
                    Email
                </label>

                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full rounded-md border p-3"
                />
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="password"
                    className="block font-medium"
                >
                    Password
                </label>

                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    minLength={6}
                    required
                    className="w-full rounded-md border p-3"
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-md bg-blue-700 p-3 font-semibold text-white disabled:opacity-50"
            >
                {isPending ? "Signing in..." : "Sign In"}
            </button>

            {errorMessage && (
                <p role="alert" className="text-sm text-red-600">
                    {errorMessage}
                </p>
            )}
        </form>
    );
}
