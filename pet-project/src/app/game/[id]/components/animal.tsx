"use client";

import { Animal } from "@/api/game/types/get";
import { Card } from "@/components/ui/card";
import { useCardStore } from "@/providers/cardProvider";
import { useEffect, useRef, useState } from "react";
import {
    draggable,
    dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { handleClick } from "../logic/outsideClick";
import styles from "./gameDisplay.module.css";
import { useRouter } from "next/navigation";
import { useAlertStore } from "@/providers/alertsProvider";
import { useProfileStore } from "@/providers/profileProvider";
import { AnimalProperties } from "./animalProperties";

export function AnimalComponent({
    animal,
    isMine,
}: {
    animal: Animal;
    isDragDisabled: boolean;
    isMine: boolean;
}) {
    const {
        excludedAnimalId,
        setExcludedAnimalId,
        cardMovingId,
        setPropertyMovingId,
        moveOrder,
    } = useCardStore((state) => state);
    const router = useRouter();
    const { addAlerts } = useAlertStore((state) => state);
    const { id } = useProfileStore((state) => state);

    const ref = useRef(null);
    const [isDraggedOver, setIsDraggedOver] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) {
            return;
        }

        return dropTargetForElements({
            element: el,
            getData: () => ({ animal }),
            onDragEnter: () => setIsDraggedOver(true),
            onDragLeave: () => setIsDraggedOver(false),
            onDrop: () => setIsDraggedOver(false),
        });
    }, [animal, excludedAnimalId]);

    useEffect(() => {
        const el = ref.current;
        if (!el || !isMine || moveOrder[0].player_id !== id) {
            return;
        }

        // const hasPredator = animal.properties.some(
        //     (property) =>
        //         property.id === "00000000-0000-0000-0000-000000000001",
        // );

        // if (!hasPredator) {
        //     return;
        // }

        return draggable({
            element: el,
            getInitialData: () => ({ type: "my-animal", animal: animal }),
            onDragStart: () => {},
            onDrop: () => {
                setPropertyMovingId(undefined);
            },
        });
    }, [animal, ref, setPropertyMovingId, id, isMine, moveOrder]);

    const bg = isDraggedOver ? "rgba(51, 170, 51, 0.5)" : undefined;
    return (
        <div
            ref={ref}
            key={animal.id}
            style={{ background: bg }}
            onClick={(e) =>
                handleClick(
                    e,
                    setExcludedAnimalId,
                    addAlerts,
                    router,
                    cardMovingId,
                    excludedAnimalId,
                )
            }
            data-key={animal.id}
            className={`flex flex-col space-y-2 mx-4 w-28 h-28 ${excludedAnimalId === animal.id || !excludedAnimalId || !isMine ? "" : styles.selectable_card}`}
        >
            {animal.properties.map((property, index) => (
                <AnimalProperties
                    key={`${property.id}-${index}`}
                    property={property}
                    animal={animal}
                />
            ))}

            <Card>
                <p>Food: {animal.food}</p>
                <p>Fat Food: {animal.fat_food}</p>
            </Card>
        </div>
    );
}
