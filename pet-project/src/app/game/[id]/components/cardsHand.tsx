"use client";

import { MyCardHand } from "./myCardHand";
import { OpponentCardHand } from "./opponentCardHand";
import { Card } from "@/stores/cardStore";

export function CardsHand({ cards }: { cards: number | Card[] }) {
    if (Array.isArray(cards)) {
        return cards.map((card, index) => (
            <MyCardHand key={`32921-${index}`} card={card} index={index} />
        ));
    }

    return [...Array(cards)].map((_, index) => (
        <OpponentCardHand key={`32920-${index}`} />
    ));
}
