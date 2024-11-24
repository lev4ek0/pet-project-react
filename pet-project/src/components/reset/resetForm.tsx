'use client'

import resetAPI from "@/api/auth/reset"
import PasswordInput from "@/components/reset/resetPasswordInput"
import RePasswordInput from "@/components/reset/resetRePasswordInput"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAlertStore } from "@/providers/alertsProvider"
import { useAuthStore } from "@/providers/authProvider"
import { useRouter, useSearchParams } from "next/navigation"

export function ResetForm() {
    const { resetPassword, resetRePassword } = useAuthStore(
        (state) => state,
    )
    const { addAlerts } = useAlertStore(
        (state) => state,
    )
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = searchParams.get("token")

        const body = {
            token: token || "",
            password: resetPassword,
            re_password: resetRePassword,
        }

        const { errors, isOk } = await resetAPI(body)

        if (!isOk) {
            addAlerts(errors)
            return
        }

        router.replace('/');
    };

    return (
        <Card className="mx-auto max-w-sm min-w-96">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Смена пароля</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} action="#" method="POST" className="space-y-6">
                        <PasswordInput />
                        <RePasswordInput />
                        <Button full>Сменить пароль</Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    )
}


