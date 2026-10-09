
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },

    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const pathname = nextUrl.pathname;

            // Protect the Create Meeting page
            const isCreatePage = pathname === '/meetings/new';

            // Protect Edit Meeting pages
            const isEditPage =
                /^\/meetings\/[^/]+\/edit\/?$/.test(pathname);

            // Redirect unauthenticated users to login
            if (isCreatePage || isEditPage) {
                return isLoggedIn;
            }

            // Redirect authenticated users away from login
            if (isLoggedIn && pathname === '/login') {
                return Response.redirect(
                    new URL('/meetings', nextUrl)
                );
            }

            return true;
        },
    },

    providers: [],
} satisfies NextAuthConfig;

