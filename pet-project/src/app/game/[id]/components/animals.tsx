"use client";

import { Animal } from "@/api/game/types/get";
import { useCardStore } from "@/providers/cardProvider";
import { useEffect, useRef, useState } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { AnimalComponent } from "./animal";

export function Animals({
    animals,
    isDragDisabled,
}: {
    animals: Animal[];
    isDragDisabled: boolean;
}) {
    const { properties: propertiesStore } = useCardStore((state) => state);

    const ref = useRef(null);
    const [isDraggedOver, setIsDraggedOver] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) {
            return;
        }

        return dropTargetForElements({
            element: el,
            getData: () => ({ isDraggedOver }),
            onDragEnter: () => setIsDraggedOver(true),
            onDragLeave: () => setIsDraggedOver(false),
            onDrop: () => setIsDraggedOver(false),
        });
    }, [propertiesStore, isDraggedOver]);

    const bg =
        isDraggedOver && !isDragDisabled ? "rgba(51, 170, 51, 0.1)" : undefined;
    return (
        <div
            ref={ref}
            className="w-full min-h-64"
            style={{
                width: "100%",
                padding: "10px",
                display: "flex",
                backgroundColor: bg,
            }}
        >
            {animals.map((animal) => {
                // const hasPredator = animal.properties.some(
                //     (property) =>
                //         property.id === "00000000-0000-0000-0000-000000000001",
                // );
                return (
                    <AnimalComponent
                        key={animal.id}
                        animal={animal}
                        isDragDisabled={isDragDisabled}
                    />
                );
            })}
        </div>
    );
}
