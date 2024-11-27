"use client";

import { useCardStore } from "@/providers/cardProvider";
import { useEffect, useState } from "react";
import { Card } from "@/stores/cardStore";
import styles from "./gameDisplay.module.css";

export function Property({ card, order }: { card: Card; order: number }) {
    const {
        cards: cardsStore,
        setPropertyMovingId,
        propertyMovingId,
    } = useCardStore((state) => state);
    const defaultClassName = order === 1 ? styles.h4_first : styles.h4_other;
    const [color, setColor] = useState(defaultClassName);

    useEffect(() => {
        if (!propertyMovingId) {
            setColor(defaultClassName);
        }
    }, [propertyMovingId, defaultClassName]);

    const properties = cardsStore.find(
        (cardStore) => card.id === cardStore.id,
    )?.properties;

    if (properties?.length === 1 && order === 1) {
        return <div></div>;
    }

    function changeColor() {
        if (order === 1) {
            setColor(styles.h4_dragging_first);
        } else {
            setColor(styles.h4_dragging_other);
        }
        setPropertyMovingId((properties || [])[order].id);
    }

    return (
        <h4
            className={color}
            onMouseDown={() => {
                changeColor();
            }}
        >
            {(properties || [])[order].name}
        </h4>
    );
}
