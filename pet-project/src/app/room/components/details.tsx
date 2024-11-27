import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { AlertDialogCancelSearch } from "./cancel";
import { Badge } from "@/components/ui/badge";

interface RoomDetailsProps {
    response: {
        id: string;
        current_players: number;
        etl: number;
        limit_players: number;
        status: string;
        mode: string;
    };
    exitRoom: () => Promise<void>;
}

export const RoomDetails = ({ response, exitRoom }: RoomDetailsProps) => {
    const [seconds, setSeconds] = useState(response.etl);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prev) => (prev <= 0 ? prev + response.etl : prev - 1));
        }, 1000);

        return () => clearInterval(interval);
    }, [response.etl]);

    return (
        <Card className="p-6 rounded-lg shadow-lg w-96 mx-auto">
            <div className="flex justify-around mb-4">
                <Badge className="w-20">
                    {response.mode === "rating" ? "Рейтинг" : "Дружеский"}
                </Badge>
                <Badge className="w-20">
                    {response.status === "search" ? "Поиск" : "Готов"}
                </Badge>
                <Badge className="w-20">1v{response.limit_players - 1}</Badge>
            </div>
            <AlertDialogCancelSearch exitRoom={exitRoom} seconds={seconds} />
            <Label>Ожидание игроков...</Label>
        </Card>
    );
};
