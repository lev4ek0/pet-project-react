"use client";

import getRoomAPI from "@/api/room/get";
import leaveRoomAPI from "@/api/room/leave";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useAlertStore } from "@/providers/alertsProvider";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { getSocketUrl } from "@/socket";
import { getAccess } from "@/utils/auth/client";
import readyRoomAPI from "@/api/room/ready";

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
        <>
            <Breadcrumb className="py-5">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Главная</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/room">
                            Комната ожидания
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="relative h-3/6 bg-gray-100">
                {response?.id}
                <br />
                {response?.current_players}
                <br />
                {response?.etl}
                <br />
                {response?.limit_players}
                <br />
                {response?.status}
                <br />
                {response?.mode}
                <br />
            </div>
            <AlertDialog open={readyGame}>
                <AlertDialogContent>
                    <AlertDialogHeader className="items-center">
                        <AlertDialogTitle>Вы готовы?</AlertDialogTitle>
                        <AlertDialogDescription />
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction
                            onClick={readyAction}
                            className="min-w-40"
                        >
                            ДА
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button type="button" variant="destructive">
                        Отменить поиск
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader className="items-center">
                        <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                        <AlertDialogDescription />
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            className="min-w-40"
                            onClick={exitRoom}
                        >
                            Да
                        </AlertDialogCancel>
                        <AlertDialogAction className="min-w-40">
                            Продолжить поиск
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
