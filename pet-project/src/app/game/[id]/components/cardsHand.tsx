"use client";

import { useCardStore } from "@/providers/cardProvider";
import { MyCardHand } from "./myCardHand";
import { OpponentCardHand } from "./opponentCardHand";
import { Card } from "@/stores/cardStore";
import { useProfileStore } from "@/providers/profileProvider";

export function CardsHand({ cards }: { cards: number | Card[] }) {
    const { moveOrder } = useCardStore((state) => state);
    const { id } = useProfileStore((state) => state);

    const isMyMove = moveOrder[0].player_id === id;

    if (Array.isArray(cards)) {
        return (
            <div
                style={{
                    width: "100%",
                    padding: "10px",
                    display: "flex",
                    borderRadius: "10px",
                    boxShadow: isMyMove
                        ? "5px 5px 5px rgba(0,0,0,0.7), 0 0 10px yellow"
                        : undefined,
                }}
            >
                {cards.map((card, index) => (
                    <MyCardHand
                        key={`32921-${index}`}
                        card={card}
                        index={index}
                    />
                ))}
            </div>
        );
    }

    return (
        <div
            style={{
                width: "100%",
                padding: "10px",
                display: "flex",
                borderRadius: "10px",
                boxShadow: isMyMove
                    ? undefined
                    : "5px 5px 5px rgba(0,0,0,0.7), 0 0 10px yellow",
            }}
        >
            {[...Array(cards)].map((_, index) => (
                <OpponentCardHand key={`32920-${index}`} />
            ))}
        </div>
    );
}
