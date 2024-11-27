"use client";
import styles from "./gameDisplay.module.css";

export function OpponentCardHand() {
    return (
        <div
            className={`${styles.card_custom_hidden} w-28 h-28 flex flex-col justify-between mr-[-${100}px]`}
        >
            <h4></h4>
        </div>
    );
}
