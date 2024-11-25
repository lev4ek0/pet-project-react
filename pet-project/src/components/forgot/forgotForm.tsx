"use client";

import forgotAPI from "@/api/auth/forgot";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAlertStore } from "@/providers/alertsProvider";
import { useAuthStore } from "@/providers/authProvider";
import { useRouter } from "next/navigation";
import EmailInput from "./forgotEmailInput";

export function ForgotForm() {
    const { forgotEmail } = useAuthStore((state) => state);
    const { addAlerts } = useAlertStore((state) => state);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const body = {
            email: forgotEmail,
        };

        const { errors, isOk } = await forgotAPI(body);

        if (!isOk) {
            addAlerts(errors);
            return;
        }

        router.replace("/");
    };

    return (
        <Card className="mx-auto max-w-sm min-w-96">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">
                    Забыли пароль
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        onSubmit={handleSubmit}
                        action="#"
                        method="POST"
                        className="space-y-6"
                    >
                        <EmailInput />
                        <Button full>Получить ссылку для сброса пароля</Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    );
}
