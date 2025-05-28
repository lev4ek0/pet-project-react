"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { meAPIPatch } from "@/api/profile/me";
import { useRouter } from "next/navigation";
import { useAlertStore } from "@/providers/alertsProvider";
import { useToast } from "@/hooks/use-toast";
import { ConfirmPassword } from "../passwords/confirm";
import { NewPassword } from "../passwords/new";
import { CurrentPassword } from "../passwords/current";

export function PasswordForm() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();
    const { addAlerts } = useAlertStore((state) => state);
    const { toast } = useToast();
    const [isShowPassword, setIsShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { errors } = await meAPIPatch(
            {
                password: newPassword,
                re_password: confirmPassword,
                old_password: currentPassword,
            },
            router,
        );

        addAlerts(errors.map((error) => error.message));

        if (!errors || errors.length == 0) {
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            toast({
                title: "Изменения успешно сохранены",
            });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Изменить пароль</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <CurrentPassword
                        currentPassword={currentPassword}
                        setCurrentPassword={setCurrentPassword}
                        isShowPassword={isShowPassword}
                        setIsShowPassword={setIsShowPassword}
                    />
                    <NewPassword
                        newPassword={newPassword}
                        setNewPassword={setNewPassword}
                        isShowPassword={isShowPassword}
                        setIsShowPassword={setIsShowPassword}
                    />
                    <ConfirmPassword
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
                        isShowPassword={isShowPassword}
                        setIsShowPassword={setIsShowPassword}
                    />
                    <Button
                        disabled={
                            !currentPassword || !newPassword || !confirmPassword
                        }
                        type="submit"
                        full
                    >
                        Изменить пароль
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
