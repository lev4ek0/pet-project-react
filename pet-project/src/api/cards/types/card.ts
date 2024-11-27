interface Chances {
    [key: string]: number;
}

export interface CardProperty {
    id: string;
    name: string;
    chances: Chances;
}

export interface Card {
    id: string;
    name: string;
    properties: CardProperty[];
}
