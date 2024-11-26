"use client";

import getGameAPI from "@/api/game/get";
import { useAlertStore } from "@/providers/alertsProvider";
import { useRouter } from "next/navigation";
import React from "react";
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

import { Button } from "@/components/ui/button";
import leaveRoomAPI from "@/api/room/leave";
import { GetGameAPIResponseBody } from "@/api/game/types/get";

export default function Game({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { addAlerts } = useAlertStore((state) => state);

    const roomId = React.use(params).id;
    const [gameData, setGameData] =
        React.useState<GetGameAPIResponseBody | null>(null);

    const fetchGameData = async () => {
        const result = await getGameAPI(router, roomId);
        if (result.isOk) {
            setGameData(result.data);
        } else {
            addAlerts(result.errors);
            router.replace("/");
        }
    };

    React.useEffect(() => {
        fetchGameData();

        const intervalId = setInterval(() => {
            fetchGameData();
        }, 1000);

        return () => clearInterval(intervalId);
    }, [router, roomId, fetchGameData]);

    async function exitGame() {
        const { isOk, errors } = await leaveRoomAPI(router);
        if (isOk) {
            router.push("/");
        } else {
            addAlerts(errors);
        }
    }

    if (!gameData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            Время на ход: {gameData?.etl}
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button type="button" variant="destructive">
                        Выйти из игры
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader className="items-center">
                        <AlertDialogTitle>
                            Вы уверены что хотите сдаться?
                        </AlertDialogTitle>
                        <AlertDialogDescription />
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            className="min-w-40"
                            onClick={exitGame}
                        >
                            Да
                        </AlertDialogCancel>
                        <AlertDialogAction className="min-w-40">
                            Продолжить игру
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
