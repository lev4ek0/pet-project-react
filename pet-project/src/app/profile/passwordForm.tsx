"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { meAPIPatch } from "@/api/profile/me";
import { useRouter } from "next/navigation";
import { useAlertStore } from "@/providers/alertsProvider";
import { useToast } from "@/hooks/use-toast";

export function PasswordForm() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();
    const { addAlerts } = useAlertStore((state) => state);
    const { toast } = useToast();

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

        addAlerts(errors);

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
                    <div className="space-y-2">
                        <Label htmlFor="current-password">Текущий пароль</Label>
                        <Input
                            id="current-password"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-password">Новый пароль</Label>
                        <Input
                            id="new-password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">
                            Подтвердить новый пароль
                        </Label>
                        <Input
                            id="confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
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
