"use client";

import { useRouter } from "next/navigation";
import meAPI from "@/api/profile/me";
import { useQuery } from "@tanstack/react-query";
import { ProfileDropdown } from "./main/components/profileDropdown";
import { RoomSettingsDialog } from "./main/components/roomSettingsDialog";
import getRoomAPI from "@/api/room/get";
import { useEffect } from "react";
import getGameProfileAPI from "@/api/game/profile";
import getCardAPI from "@/api/cards/card";
import getCardPropertiesAPI from "@/api/cards/propery";
import { useCardStore } from "@/providers/cardProvider";
import { useProfileStore } from "@/providers/profileProvider";

export default function Home() {
    const router = useRouter();
    const { updateCards, updateProperties } = useCardStore((state) => state);
    const { setId } = useProfileStore((state) => state);

    const { data: meData, isSuccess: meIsSuccess } = useQuery({
        queryKey: ["me"],
        queryFn: async () => meAPI(router),
    });

    const { data: profileData } = useQuery({
        queryKey: ["profile"],
        queryFn: async () => getGameProfileAPI(router),
    });

    const { data: cardData } = useQuery({
        queryKey: ["card"],
        queryFn: async () => getCardAPI(),
    });

    const { data: cardPropertyData } = useQuery({
        queryKey: ["card_property"],
        queryFn: async () => getCardPropertiesAPI(),
    });

    useEffect(() => {
        if (meData?.data) {
            setId(meData?.data.id);
        }
        if (cardData?.data) {
            updateCards(cardData?.data);
        }
        if (cardPropertyData?.data) {
            updateProperties(cardPropertyData?.data);
        }

        const checkDataAndRedirect = async () => {
            const { isOk, data } = await getRoomAPI(router);
            if (isOk && data?.status !== "game") {
                router.push("/room");
            }
            if (isOk && data?.status === "game") {
                router.push("/game/" + data.id);
            }
        };

        checkDataAndRedirect();
    }, [
        router,
        cardData,
        cardPropertyData,
        updateCards,
        updateProperties,
        setId,
        meData?.data,
    ]);

    return (
        <div className="relative h-screen">
            <div className="absolute top-8 right-8">
                <ProfileDropdown
                    data={meData}
                    isSuccess={meIsSuccess}
                    dataProfile={profileData}
                />
            </div>

            <div className="absolute bottom-8 right-8">
                <RoomSettingsDialog />
            </div>
        </div>
    );
}
