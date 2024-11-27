"use client";

import getGameAPI from "@/api/game/get";
import { useAlertStore } from "@/providers/alertsProvider";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useCardStore } from "@/providers/cardProvider";
import { getAccess } from "@/utils/auth/client";
import { getSocketUrl } from "@/socket";
import dynamic from "next/dynamic";

const GameComponent = dynamic(() => import("@/app/game/[id]/components/game"), {
    ssr: false,
});

export default function Game({ params }: { params: Promise<{ id: string }> }) {
    const roomId = React.use(params).id;
    const router = useRouter();
    const { createFromGame } = useCardStore((state) => state);
    const { addAlerts } = useAlertStore((state) => state);

    useEffect(() => {
        const fetchGameData = async () => {
            const result = await getGameAPI(router, roomId);
            if (result.isOk && result.data) {
                createFromGame(result.data);
            } else {
                addAlerts(result.errors);
                router.replace("/");
            }
        };

        fetchGameData();

        const accessToken = getAccess();
        const socketUrl = getSocketUrl(accessToken || "", roomId);
        const wssWebSocket = new WebSocket(socketUrl);
        wssWebSocket.addEventListener("message", () => {
            fetchGameData();
        });

        return () => {
            wssWebSocket.close();
        };
    }, [roomId, addAlerts, createFromGame, router]);

    return <GameComponent />;
}
