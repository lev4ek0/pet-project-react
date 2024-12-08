import { Card } from "@/components/ui/card";
import { getColorForText } from "../logic/color";
import { useCardStore } from "@/providers/cardProvider";
import { Animal, AnimalProperty } from "@/api/game/types/get";
import styles from "./gameDisplay.module.css";
import { useEffect, useState } from "react";

export function AnimalProperties({
    property,
    animal,
}: {
    property: AnimalProperty;
    animal: Animal;
}) {
    const {
        properties: propertiesStore,
        setPropertyMovingId,
        propertyMovingId,
    } = useCardStore((state) => state);

    const defaultClassName = "";
    const [color, setColor] = useState(defaultClassName);

    useEffect(() => {
        if (!propertyMovingId) {
            setColor(defaultClassName);
        }
    }, [propertyMovingId, defaultClassName]);

    function changeColor() {
        setColor(styles.h4_dragging_other);

        setPropertyMovingId(property.id);
    }

    let backgroundColor;
    let className;

    if (color) {
        className = color;
    } else {
        backgroundColor = getColorForText(
            property.connected_animal_id || animal.id,
            property.id,
            animal,
        );
    }

    const style = {
        backgroundColor,
    };

    return (
        <Card
            style={style}
            className={className}
            onMouseDown={() => {
                changeColor();
            }}
        >
            <p>
                {
                    propertiesStore.find(
                        (propertyStore) => property.id === propertyStore.id,
                    )?.name
                }
            </p>
        </Card>
    );
}
