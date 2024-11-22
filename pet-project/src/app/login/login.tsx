'use client'

import ErrorAlerts from "@/components/alerts";
import LoginHeader from "@/components/login/loginHeader";
import { AuthProvider } from "@/context/auth";
import LoginForm from "@/components/login/loginForm";


export function Login() {
    return (
        <>
            <AuthProvider>
                <ErrorAlerts />
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <LoginHeader />
                    <LoginForm />
                </div>
            </AuthProvider>
        </>
    );
}
