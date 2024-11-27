"use client";

import { Animal } from "@/api/game/types/get";
import { Card } from "@/components/ui/card";
import { useCardStore } from "@/providers/cardProvider";
import { getColorForText } from "../logic/color";
import { useEffect, useRef, useState } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

export function AnimalComponent({
    animal,
    isDragDisabled,
}: {
    animal: Animal;
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
            getData: () => ({ animal }),
            onDragEnter: () => setIsDraggedOver(true),
            onDragLeave: () => setIsDraggedOver(false),
            onDrop: () => setIsDraggedOver(false),
        });
    }, [propertiesStore, animal]);

    const bg =
        isDraggedOver && !isDragDisabled ? "rgba(51, 170, 51, 0.5)" : undefined;
    return (
        <div
            ref={ref}
            className="flex flex-col space-y-2 mx-4 w-28 h-28"
            key={animal.id}
            style={{ background: bg }}
        >
            {animal.properties.map((property) => (
                <Card
                    style={{
                        backgroundColor: getColorForText(
                            property.connected_animal_id || animal.id,
                            property.id,
                        ),
                    }}
                    // className={`${isDark && excludedAnimal === animal.id ? "w-40 h-10" : "w-40 h-10 bg-card"}`}
                    key={property.id} // Changed from index to property.id for a stable key
                >
                    <p>
                        {
                            propertiesStore.find(
                                (propertyStore) =>
                                    property.id === propertyStore.id,
                            )?.name
                        }
                    </p>
                </Card>
            ))}

            <Card
            // className={`${isDark && excludedAnimal === animal.id ? "w-40 h-32" : "w-40 h-32 bg-card"}`}
            >
                <p>Food: {animal.food}</p>
                <p>Fat Food: {animal.fat_food}</p>
            </Card>
        </div>
    );
}
