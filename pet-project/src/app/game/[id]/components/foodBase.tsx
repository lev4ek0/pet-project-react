import { Card } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useCardStore } from "@/providers/cardProvider";

export function FoodBase() {
    const ref = useRef(null);
    const [isDraggedOver, setIsDraggedOver] = useState(false);
    const { current_food } = useCardStore((state) => state);

    useEffect(() => {
        const el = ref.current;
        if (!el) {
            return;
        }

        return dropTargetForElements({
            element: el,
            getData: () => ({ isDraggedOver, type: "food-base" }),
            onDragEnter: () => setIsDraggedOver(true),
            onDragLeave: () => setIsDraggedOver(false),
            onDrop: () => setIsDraggedOver(false),
        });
    }, [isDraggedOver]);

    const bg = isDraggedOver ? "rgba(51, 170, 51, 0.1)" : undefined;
    return (
        <Card
            className="min-h-28 min-w-28 flex justify-center"
            style={{
                backgroundColor: bg,
            }}
            ref={ref}
        >
            <p>{current_food}</p>
        </Card>
    );
}
