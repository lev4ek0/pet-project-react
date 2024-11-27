"use client";

import getRoomAPI from "@/api/room/get";
import leaveRoomAPI from "@/api/room/leave";

import { useAlertStore } from "@/providers/alertsProvider";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { getSocketUrl } from "@/socket";
import { getAccess } from "@/utils/auth/client";
import readyRoomAPI from "@/api/room/ready";
import { AlertDialogReady } from "./components/ready";
import { RoomDetails } from "./components/details";

interface JsonMessage {
    type: string;
}

export default function Room() {
    const router = useRouter();
    const { addAlerts } = useAlertStore((state) => state);
    const [readyGame, setReadyGame] = useState(false);

    const { data, isSuccess } = useQuery({
        queryKey: ["room"],
        queryFn: async () => getRoomAPI(router),
        staleTime: 0,
        gcTime: 0,
    });

    const response = data?.data;

    useEffect(() => {
        if (isSuccess && !data.isOk) {
            router.replace("/");
        }

        if (isSuccess && data.data?.status === "game") {
            router.replace("/game");
        }

        if (isSuccess && data.data?.status === "ready") {
            setReadyGame(true);
        }

        if (isSuccess && data.data?.id) {
            const accessToken = getAccess();
            const socketUrl = getSocketUrl(accessToken || "", data?.data?.id);
            const wssWebSocket = new WebSocket(socketUrl);
            wssWebSocket.addEventListener("message", (event) => {
                const jsonMessage = JSON.parse(event.data);
                const message = jsonMessage as JsonMessage;

                if (message.type === "ready") {
                    setReadyGame(true);
                }

                if (message.type === "start") {
                    router.replace("/game/" + data.data?.id);
                }
            });
        }
    }, [isSuccess, data, router]);

    async function exitRoom() {
        const { isOk, errors } = await leaveRoomAPI(router);
        if (isOk) {
            router.replace("/");
        } else {
            addAlerts(errors);
        }
    }

    async function readyAction() {
        const { errors, isOk } = await readyRoomAPI(router);
        if (isOk) {
            setReadyGame(false);
        }
        addAlerts(errors);
    }

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            {response && (
                <>
                    <RoomDetails response={response} exitRoom={exitRoom} />
                    <AlertDialogReady
                        readyGame={readyGame}
                        readyAction={readyAction}
                    />
                </>
            )}
        </div>
    );
}
