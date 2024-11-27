"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
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
import { GameDisplay } from "../components/gameDisplay";
import { useCardStore } from "@/providers/cardProvider";
import { foldAPI } from "@/api/game/fold";
import { ResultsComponent } from "./results";
import { useProfileStore } from "@/providers/profileProvider";

export default function GameComponent() {
    const router = useRouter();
    const { cards_left, etl, phase, results, moveOrder, me, setEtl } =
        useCardStore((state) => state);
    const { id } = useProfileStore((state) => state);

    useEffect(() => {
        if (etl === 0) return;

        const intervalId = setInterval(() => {
            setEtl(etl - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [etl, setEtl]);

    async function exitGame() {
        const { isOk, errors } = await leaveRoomAPI(router);
        if (isOk) {
            router.push("/");
        } else {
            console.log(errors);
        }
    }

    async function fold() {
        const { isOk, errors } = await foldAPI(router);
        if (isOk) {
        } else {
            console.log(errors);
        }
    }

    if (phase === "") {
        return <div>Loading...</div>;
    }

    if (
        me.cards.length === 0 &&
        moveOrder[0].player_id === id &&
        phase === "evolution"
    ) {
        fold();
    }

    return (
        <div className={""}>
            {phase === "end" && results ? (
                <div className="flex h-screen w-full items-center justify-center px-4">
                    <ResultsComponent results={results} />
                </div>
            ) : (
                <>
                    Время на ход: {etl}, Фаза: {phase}, Ход:{" "}
                    {moveOrder[0].player_id === id ? "Ваш" : "Противника"},
                    Оставшихся карт: {cards_left}
                    <Button
                        className="mr-4"
                        type="button"
                        variant="default"
                        onClick={fold}
                    >
                        Пас
                    </Button>
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
                    <GameDisplay />
                </>
            )}
        </div>
    );
}
