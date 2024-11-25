'use client'

import { PasswordForm } from "./passwordForm"
import { ProfileForm } from "./profileForm"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SocialMediaLinks } from "./socialMediaLinks"
import { useQuery } from "@tanstack/react-query"
import meAPI from "@/api/profile/me"
import { useRouter } from "next/navigation"


export function Profile() {
    const me = useQuery({
        queryKey: ['me'],
        queryFn: async () => meAPI(router)
    });
    const router = useRouter();

    return (
        <>
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

                <h1 className="text-3xl font-bold mb-6 mx-auto">Настройки профиля</h1>
                <div className="space-y-6">
                    <ProfileForm
                        isLoading={me.isLoading}
                        name={me.data?.data?.nickname}
                        email={me.data?.data?.email}
                        avatar={me.data?.data?.avatar_url}        
                    />
                    <SocialMediaLinks />
                    <PasswordForm />
                </div>
            </div>
        </>
    )
}
