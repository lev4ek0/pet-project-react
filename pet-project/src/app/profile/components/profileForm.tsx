"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { meAPIPatch } from "@/api/profile/me";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { MeAPIRequestBody } from "@/app/profile/types/me";
import { useProfileStore } from "@/providers/profileProvider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useAlertStore } from "@/providers/alertsProvider";

interface ProfileFormProps {
    isLoading: boolean;
    name?: string;
    username?: string;
    email?: string;
    avatar?: string;
}

const EmailLifetime =
    parseInt(process.env.NEXT_PUBLIC_EMAIL_LIFETIME || "") || 60 * 60 * 24;

export function ProfileForm({
    isLoading,
    name,
    username,
    email,
    avatar,
}: ProfileFormProps) {
    const { addAlerts } = useAlertStore((state) => state);
    const [nameForm, setName] = useState("");
    const [usernameForm, setUsername] = useState("");
    const [emailForm, setEmail] = useState("");
    const [isNewEmail, setIsNewEmail] = useState(false);
    const { newEmail, updatedAt, setNewEmail } = useProfileStore(
        (state) => state,
    );
    const { toast } = useToast();
    const router = useRouter();
    const queryClient = useQueryClient();

    const newEmailWarning = (
        <Alert variant="warn">
            <AlertTitle>Подтвердите почту!</AlertTitle>
            <AlertDescription>
                На почту {newEmail} отправлено письмо для подтверждения
            </AlertDescription>
        </Alert>
    );

    const inputAvatar = isLoading ? (
        <Skeleton className="h-20 w-20 rounded-full" />
    ) : (
        <Avatar className="w-20 h-20">
            <AvatarImage src={avatar} />
            <AvatarFallback>
                <Skeleton className="h-20 w-20 rounded-full" />
            </AvatarFallback>
        </Avatar>
    );

    const inputUsername = isLoading ? (
        <Skeleton className="h-9 w-full" />
    ) : (
        <Input
            id="username"
            value={usernameForm}
            onChange={(e) => setUsername(e.target.value)}
        />
    );

    const inputName = isLoading ? (
        <Skeleton className="h-9 w-full" />
    ) : (
        <Input
            id="name"
            value={nameForm}
            onChange={(e) => setName(e.target.value)}
        />
    );

    const inputEmail = isLoading ? (
        <Skeleton className="h-9 w-full" />
    ) : (
        <Input
            id="email"
            value={emailForm}
            onChange={(e) => setEmail(e.target.value)}
        />
    );

    useEffect(() => {
        if (
            newEmail &&
            (newEmail === email ||
                (updatedAt || 0) + EmailLifetime <
                    Math.floor(new Date().getTime() / 1000))
        ) {
            setNewEmail(undefined);
        } else if (newEmail && newEmail !== email) {
            setIsNewEmail(true);
        }

        setEmail(email || "");
        setName(name || "");
        setUsername(username || "");
    }, [newEmail, email, username, name, updatedAt, setNewEmail]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedFields: MeAPIRequestBody = {};
        if (email != emailForm) updatedFields.email = emailForm;
        if (name != nameForm) updatedFields.name = nameForm;
        if (username != usernameForm) updatedFields.username = usernameForm;

        if (Object.keys(updatedFields).length > 0) {
            const response = await meAPIPatch(updatedFields, router);
            addAlerts(response.errors);

            if (response.data && updatedFields.email) {
                setNewEmail(updatedFields.email);
            }
            if (response.data) {
                await queryClient.invalidateQueries({ queryKey: ["me"] });
                toast({
                    title: "Изменения успешно сохранены",
                });
            }
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Информация о профиле</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center space-x-4">
                        {inputAvatar}
                        <Button variant="outline">Изменить аватар</Button>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name">Обращение</Label>
                        {inputName}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="username">Никнейм</Label>
                        {inputUsername}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Почта</Label>
                        {isNewEmail && newEmailWarning}
                        {inputEmail}
                    </div>
                    <Button
                        disabled={
                            isLoading ||
                            (email == emailForm && name == nameForm && username == usernameForm)
                        }
                        type="submit"
                        full
                    >
                        Сохранить изменения
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
