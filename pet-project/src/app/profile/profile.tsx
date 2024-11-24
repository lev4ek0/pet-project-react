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


export function Profile() {
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
                    <ProfileForm />
                    <SocialMediaLinks />
                    <PasswordForm />
                </div>
            </div>
        </>
    )
}
