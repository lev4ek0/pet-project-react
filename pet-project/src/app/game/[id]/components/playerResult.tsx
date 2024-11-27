import { Badge } from "@/components/ui/badge";
import { useProfileStore } from "@/providers/profileProvider";
import { PlayerResult } from "@/stores/cardStore";
import styles from "./gameDisplay.module.css";

export function PlayerResultComponent({
    playerResult,
}: {
    playerResult: PlayerResult;
}) {
    const { id } = useProfileStore((state) => state);

    return (
        <div
            className={`flex flex-col ${id === playerResult.id ? styles.highlight : ""}`}
        >
            <Badge className="w-20">{playerResult.place}</Badge>
            <div>{playerResult.id}</div>
            <div>Монет + {playerResult.coins}</div>
            <div>Рейтинг {playerResult.rating}</div>
            <div>Очки за игру {playerResult.points}</div>
        </div>
    );
}
