"use client";

import { useRouter } from "next/navigation";
import meAPI from "@/api/profile/me";
import { useQuery } from "@tanstack/react-query";
import { RoomSettingsDialog } from "./main/roomSettingsDialog";
import { ProfileDropdown } from "./main/profileDropdown";

export default function Home() {
    const router = useRouter();

    const { data, isSuccess } = useQuery({
        queryKey: ["me"],
        queryFn: async () => meAPI(router),
    });

    return (
        <div className="relative h-screen bg-gray-100">
            <div className="absolute top-8 right-8">
                <ProfileDropdown data={data} isSuccess={isSuccess} />
            </div>

            <div className="absolute bottom-8 right-8">
                <RoomSettingsDialog />
            </div>
        </div>
    );
}
