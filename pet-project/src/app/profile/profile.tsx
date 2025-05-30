"use client";

import { PasswordForm } from "./components/passwordForm";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useQuery } from "@tanstack/react-query";
import meAPI from "@/api/profile/me";
import { useRouter } from "next/navigation";
import { useAlertStore } from "@/providers/alertsProvider";
import { ProfileForm } from "./components/profileForm";
import { SocialMediaLinks } from "./components/socialMediaLinks";

export function Profile() {
    const { addAlerts } = useAlertStore((state) => state);

    const router = useRouter();

    const { isLoading, data } = useQuery({
        queryKey: ["me"],
        queryFn: async () => meAPI(router),
    });

    if (!isLoading && !data?.isOk) {
        addAlerts(data?.errors.map((error) => error.message) || []);
    }

    return (
        <div className="container mx-auto max-w-screen-sm py-5">
            <Breadcrumb className="py-5">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Главная</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/profile">Профиль</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <h1 className="text-3xl font-bold mb-6 mx-auto">
                Настройки профиля
            </h1>
            <div className="space-y-6">
                <ProfileForm
                    isLoading={isLoading}
                    name={data?.data?.name}
                    username={data?.data?.username}
                    email={data?.data?.email}
                    avatar={data?.data?.avatar_url}
                />
                <SocialMediaLinks
                    isLoading={isLoading}
                    oauthAccounts={data?.data?.oauth_accounts || []}
                />
                <PasswordForm />
            </div>
        </div>
    );
}
