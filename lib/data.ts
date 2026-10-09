
import 'server-only';
import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error('DATABASE_URL is not configured');
}

const sql = neon(databaseUrl);

export type AuthUser = {
    id: string;
    name: string | null;
    email: string;
    passwordHash: string;
};

export async function getUserByEmail(
    email: string
): Promise<AuthUser | null> {
    try {
        const users = await sql`
      SELECT
        id,
        name,
        email,
        password_hash AS "passwordHash"
      FROM users
      WHERE LOWER(email) = LOWER(${email})
      LIMIT 1
    `;

        if (users.length === 0) {
            return null;
        }

        const user = users[0];

        return {
            id: String(user.id),
            name: user.name ?? null,
            email: String(user.email),
            passwordHash: String(user.passwordHash),
        };
    } catch (error) {
        console.error('Failed to retrieve authentication user:', error);
        return null;
    }
}
