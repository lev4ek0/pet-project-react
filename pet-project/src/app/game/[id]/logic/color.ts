import { Animal } from "@/api/game/types/get";

const availableColors = [
    "#f6bd60",
    "#f7ede2",
    "#f5cac3",
    "#84a59d",
    "#f28482",
    "#9dbebb",
    "#8e9aaf",
    "#cbc0d3",
];
const colorsMap = new Map();

export const getColorForText = (
    text: string,
    property_id: string,
    currentAnimal: Animal,
) => {
    if (property_id !== "00000000-0000-0000-0000-000000000004") {
        return undefined;
    }

    const sortedKeyComponents = [text, currentAnimal.id].sort();
    const key = sortedKeyComponents.join("-");

    if (colorsMap.has(key)) {
        return colorsMap.get(key);
    } else {
        const usedColors = new Set([...colorsMap.values()]);
        const unusedColors = availableColors.filter(
            (color) => !usedColors.has(color),
        );
        const selectedColor = unusedColors[0] || null;

        if (selectedColor) {
            colorsMap.set(key, selectedColor);
        }
        return selectedColor;
    }
};
