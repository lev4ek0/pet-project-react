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

export const getColorForText = (text: string, property_id: string) => {
    if (
        colorsMap.has(text) &&
        property_id === "00000000-0000-0000-0000-000000000004"
    ) {
        return colorsMap.get(text);
    } else if (property_id === "00000000-0000-0000-0000-000000000004") {
        const unusedColors = availableColors.filter(
            (color) => ![...colorsMap.values()].includes(color),
        );
        const selectedColor = unusedColors[0];

        colorsMap.set(text, selectedColor);
        return selectedColor;
    } else {
        return undefined;
    }
};
