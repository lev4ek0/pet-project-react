"use client";

import { useRouter } from "next/navigation";
import meAPI from "@/api/profile/me";
import { useQuery } from "@tanstack/react-query";
import { ProfileDropdown } from "./main/components/profileDropdown";

export default function Home() {
    const router = useRouter();

    const { data: meData, isSuccess: meIsSuccess } = useQuery({
        queryKey: ["me"],
        queryFn: async () => meAPI(router),
    });

    return (
        <div className="relative h-screen">
            <div className="absolute top-8 right-8">
                <ProfileDropdown
                    data={meData}
                    isSuccess={meIsSuccess}
                />
            </div>
        </div>
    );
}
