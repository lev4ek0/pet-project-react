"use client";

import { useRouter } from "next/navigation";
import meAPI from "@/api/profile/me";
import { useQuery } from "@tanstack/react-query";
import { ProfileDropdown } from "./main/components/profileDropdown";
import { RoomSettingsDialog } from "./main/components/roomSettingsDialog";
import getRoomAPI from "@/api/room/get";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();

    const { data: meData, isSuccess: meIsSuccess } = useQuery({
        queryKey: ["me"],
        queryFn: async () => meAPI(router),
    });

    useEffect(() => {
        const checkDataAndRedirect = async () => {
            const { isOk, data } = await getRoomAPI(router);
            if (isOk && data?.status !== "game") {
                router.push("/room");
            }
        };

        checkDataAndRedirect();
    }, [router]);

    return (
        <div className="relative h-screen bg-gray-100">
            <div className="absolute top-8 right-8">
                <ProfileDropdown data={meData} isSuccess={meIsSuccess} />
            </div>

            <div className="absolute bottom-8 right-8">
                <RoomSettingsDialog />
            </div>
        </div>
    );
}
