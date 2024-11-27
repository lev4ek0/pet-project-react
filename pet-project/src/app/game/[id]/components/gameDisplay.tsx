"use client";

import { Animal, Card } from "@/api/game/types/get";
import React, { useEffect } from "react";
import { useCardStore } from "@/providers/cardProvider";
import { CardsHand } from "./cardsHand";
import { Animals } from "./animals";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { addNewAnimalPropertyAPI, addNewAnimalAPI } from "@/api/game/evolution";
import { useRouter } from "next/navigation";

export function GameDisplay() {
    const { opponents, me, propertyMovingId, setPropertyMovingId } =
        useCardStore((state) => state);
    const router = useRouter();

    useEffect(() => {
        return monitorForElements({
            onDrop({ source, location }) {
                const destination = location.current.dropTargets[0];
                if (!destination) {
                    // if dropped outside of any drop targets
                    return;
                }
                const destinationLocation = destination.data.animal as Animal;
                const sourceCard = source.data.card as Card;

                if (!destinationLocation) {
                    async function addNewAnimal() {
                        await addNewAnimalAPI(router, sourceCard.id);
                    }

                    addNewAnimal();
                } else {
                    async function addNewAnimalProperty() {
                        await addNewAnimalPropertyAPI(
                            router,
                            sourceCard.id,
                            [destinationLocation.id],
                            propertyMovingId,
                        );
                    }

                    addNewAnimalProperty();
                }
                //
                console.log(source);
                console.log(destination);
                setPropertyMovingId(undefined);
            },
        });
    }, [opponents, me, propertyMovingId, setPropertyMovingId, router]);

    if (opponents.length === 0) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            {/* <h1>Game ID: {gameData.id}</h1>
            <p>Current Food: {gameData.current_food}</p>
            <p>Turn Time: {gameData.turn_time}</p>
            <p>Phase: {gameData.phase}</p>
            <p>ETL: {gameData.etl}</p>
            <p>Last Move: {gameData.last_move}</p> */}

            <div>
                {/* Opponent Cards Fixed at the Top */}
                <div
                    className="w-3/12 min-h-36"
                    style={{ top: 50, position: "absolute" }}
                >
                    <div
                        style={{
                            width: "100%",
                            padding: "10px",
                            display: "flex",
                        }}
                    >
                        <CardsHand
                            cards={opponents[0] ? opponents[0].cardsAmount : 0}
                        />
                    </div>
                </div>
                <div
                    className="w-6/12 min-h-64"
                    style={{ top: 50, left: 400, position: "absolute" }}
                >
                    <Animals
                        isDragDisabled={true}
                        animals={opponents[0].animals}
                    />
                </div>
                <div
                    className="w-full min-h-64"
                    style={{ bottom: 122, position: "absolute" }}
                >
                    <Animals isDragDisabled={false} animals={me.animals} />
                </div>
                <div
                    className="w-full min-h-36"
                    style={{ bottom: 0, position: "absolute" }}
                >
                    <div
                        style={{
                            width: "100%",
                            padding: "10px",
                            display: "flex",
                        }}
                    >
                        <CardsHand cards={me.cards} />
                    </div>
                </div>
            </div>

            {/* {gameData.results && (
                <div>
                    <h3>Results:</h3>
                    {gameData.results.players.map((player) => (
                        <div key={player.id}>
                            <p>Player ID: {player.id}</p>
                            <p>Place: {player.place}</p>
                            <p>Rating: {player.rating}</p>
                            <p>Coins: {player.coins}</p>
                            <p>Points: {player.points}</p>
                        </div>
                    ))}
                </div>
            )} */}
        </div>
    );
}
