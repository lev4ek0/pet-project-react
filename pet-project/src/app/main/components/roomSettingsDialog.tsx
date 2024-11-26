"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Slider } from "@radix-ui/react-slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import joinRoomAPI from "@/api/room/join";
import { useRouter } from "next/navigation";
import { useAlertStore } from "@/providers/alertsProvider";
import { useQueryClient } from "@tanstack/react-query";

export function RoomSettingsDialog() {
    const router = useRouter();
    const [playersCount, setPlayersCount] = useState(2);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [gameMode, setGameMode] = useState("rating");
    const { addAlerts } = useAlertStore((state) => state);
    const queryClient = useQueryClient();

    const handleIncrement = () => {
        if (playersCount < 4) {
            setPlayersCount((prev) => prev + 1);
        }
    };

    const handleDecrement = () => {
        if (playersCount > 2) {
            setPlayersCount((prev) => prev - 1);
        }
    };

    const changeDialogState = () => {
        setIsDialogOpen(!isDialogOpen);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const { errors } = await joinRoomAPI(router, {
            players: playersCount,
            mode: gameMode,
        });
        if (errors && errors.length >= 1) {
            addAlerts(errors);
            changeDialogState();
            return;
        }

        await queryClient.invalidateQueries({ queryKey: ["room"] });
        router.push("/room");
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={() => changeDialogState()}>
            <DialogTrigger asChild>
                <Button
                    onClick={() => changeDialogState()}
                    className="px-20 py-2 rounded-md"
                >
                    Играть
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px] p-6">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        Настройки комнаты
                    </DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">
                        Выберите настройки комнаты
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-6 pt-4">
                    <div>
                        <Label htmlFor="mode" className="font-medium">
                            Режим игры
                        </Label>
                        <RadioGroup
                            value={gameMode}
                            onValueChange={setGameMode}
                            id="mode"
                            className="flex flex-col items-center mt-2 space-y-2"
                        >
                            <div className="flex items-center space-x-3">
                                <RadioGroupItem value="rating" id="r1" />
                                <Label htmlFor="r1" className="cursor-pointer">
                                    Рейтинговый
                                </Label>
                            </div>
                            <div className="flex items-center space-x-3 mt-2">
                                <RadioGroupItem value="friendly" id="r2" />
                                <Label htmlFor="r2" className="cursor-pointer">
                                    Дружеский
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div>
                        <Label htmlFor="players" className="font-medium">
                            Количество игроков
                        </Label>
                        <div
                            id="players"
                            className="flex flex-col items-center"
                        >
                            <button
                                type="button"
                                onClick={handleIncrement}
                                disabled={playersCount >= 4}
                                className="text-xl"
                            >
                                {playersCount >= 4 ? "△" : "▲"}
                            </button>
                            <Slider
                                value={[playersCount]}
                                min={2}
                                max={4}
                                step={1}
                                onValueChange={(newValue) =>
                                    setPlayersCount(newValue[0])
                                }
                                className="w-full"
                            />
                            <span className="text-lg font-semibold">
                                {playersCount}
                            </span>
                            <button
                                type="button"
                                onClick={handleDecrement}
                                disabled={playersCount <= 2}
                                className="text-xl"
                            >
                                {playersCount <= 2 ? "▽" : "▼"}
                            </button>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="w-full">
                            Начать игру
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
