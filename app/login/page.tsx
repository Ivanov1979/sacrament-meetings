
import { LoginForm } from '@/components/login-form';

export default function LoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-sm space-y-6">
                <h1 className="text-center text-3xl font-bold">
                    Sign In
                </h1>
                <LoginForm />
            </div>
        </main>
    );
}
