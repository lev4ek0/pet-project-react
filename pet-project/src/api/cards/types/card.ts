interface Chances {
    [key: string]: number;
}

interface CardProperty {
    id: string;
    name: string;
    chances: Chances;
}

interface Card {
    id: string;
    name: string;
    properties: CardProperty[];
}

type CardList = Card[];
