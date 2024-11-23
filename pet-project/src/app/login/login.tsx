'use client'

import ErrorAlerts from "@/components/alerts";
import { AuthProvider } from "@/context/auth";
import LoginForm from "@/components/login/loginForm";


export function Login() {
    return (
        <>
            <AuthProvider>
                <ErrorAlerts />
                <LoginForm/>
            </AuthProvider>
        </>
    );
}
