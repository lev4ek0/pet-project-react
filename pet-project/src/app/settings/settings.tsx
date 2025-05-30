"use client";

import React from "react";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ModeToggle } from "./components/themeMode";

export function Settings() {
    return (
        <>
            <div className="container mx-auto py-5">
                <Breadcrumb className="py-5">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Главная</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/settings">
                                Настройки
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="py-5 flex gap-4">
                    Цветовая тема
                    <ModeToggle />
                </div>
            </div>
        </>
    );
}
