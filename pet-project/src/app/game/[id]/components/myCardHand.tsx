"use client";

import { Property } from "./propertyHand";
import { Card } from "@/stores/cardStore";
import { useEffect, useRef } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useCardStore } from "@/providers/cardProvider";
import styles from "./gameDisplay.module.css";
import { useProfileStore } from "@/providers/profileProvider";

export function MyCardHand({ card, index }: { card: Card; index: number }) {
    const { setPropertyMovingId, moveOrder } = useCardStore((state) => state);
    const ref = useRef(null);
    const { id } = useProfileStore((state) => state);

    useEffect(() => {
        const el = ref.current;
        if (!el) {
            return;
        }

        if (moveOrder[0].player_id !== id) {
            return;
        }

        return draggable({
            element: el,
            getInitialData: () => ({ type: "my-card", card: card }),
            onDragStart: () => {},
            onDrop: () => {
                setPropertyMovingId(undefined);
            },
        });
    }, [index, card, ref, setPropertyMovingId, id, moveOrder]);

    return (
        <div
            ref={ref}
            className={`w-28 h-28 flex flex-col justify-between mr-[-${70}px] ${styles.card_custom}`}
        >
            <Property key={`${card.id}-${index}-0`} card={card} order={0} />
            <Property key={`${card.id}-${index}-1`} card={card} order={1} />
        </div>
    );
}
