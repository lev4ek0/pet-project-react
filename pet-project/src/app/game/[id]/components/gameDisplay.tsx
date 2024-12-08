"use client";

import { Animal, Card } from "@/api/game/types/get";
import React, { useEffect } from "react";
import { useCardStore } from "@/providers/cardProvider";
import { CardsHand } from "./cardsHand";
import { Animals } from "./animals";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { addNewAnimalPropertyAPI, addNewAnimalAPI } from "@/api/game/evolution";
import { useRouter } from "next/navigation";
import { useAlertStore } from "@/providers/alertsProvider";
import { activatePropertyAPI, eatFromFoodBaseAPI } from "@/api/game/nutrition";
import { FoodBase } from "./foodBase";

export function GameDisplay() {
    const {
        opponents,
        me,
        propertyMovingId,
        setExcludedAnimalId,
        setPropertyMovingId,
        setCardMovingId,
        phase,
    } = useCardStore((state) => state);
    const router = useRouter();
    const { addAlerts } = useAlertStore((state) => state);

    useEffect(() => {
        return monitorForElements({
            onDrop({ source, location }) {
                const destination = location.current.dropTargets[0];
                if (!destination) {
                    return;
                }

                if (source.data.type === "my-card") {
                    const destinationLocation = destination.data
                        .animal as Animal;
                    const sourceCard = source.data.card as Card;

                    if (!destinationLocation) {
                        async function addNewAnimal() {
                            const { errors } = await addNewAnimalAPI(
                                router,
                                sourceCard.id,
                            );
                            addAlerts(errors);
                        }

                        addNewAnimal();
                    } else if (
                        propertyMovingId !==
                        "00000000-0000-0000-0000-000000000004"
                    ) {
                        async function addNewAnimalProperty() {
                            const { errors } = await addNewAnimalPropertyAPI(
                                router,
                                sourceCard.id,
                                [destinationLocation.id],
                                propertyMovingId,
                            );
                            addAlerts(errors);
                        }

                        addNewAnimalProperty();
                    } else if (me.animals.length < 2) {
                        addAlerts([
                            "Нельзя применить сотрудничество на одно существо",
                        ]);
                    } else {
                        setExcludedAnimalId(destinationLocation.id);
                        setCardMovingId(sourceCard.id);
                    }

                    setPropertyMovingId(undefined);
                }

                if (
                    source.data.type === "my-animal" &&
                    destination.data.type !== "food-base"
                ) {
                    const destinationLocation = destination.data
                        .animal as Animal;
                    const sourceAnimal = source.data.animal as Animal;

                    async function activateProperty() {
                        const { errors } = await activatePropertyAPI(
                            router,
                            sourceAnimal.id,
                            propertyMovingId || "",
                            sourceAnimal.id === destinationLocation.id
                                ? undefined
                                : destinationLocation.id,
                        );
                        addAlerts(errors);
                    }

                    activateProperty();
                    setPropertyMovingId(undefined);
                }

                if (
                    source.data.type === "my-animal" &&
                    destination.data.type === "food-base"
                ) {
                    const sourceAnimal = source.data.animal as Animal;

                    async function eatFromFoodBase() {
                        const { errors } = await eatFromFoodBaseAPI(
                            router,
                            sourceAnimal.id,
                        );
                        addAlerts(errors);
                    }

                    eatFromFoodBase();
                    setPropertyMovingId(undefined);
                }
            },
        });
    }, [
        opponents,
        me,
        propertyMovingId,
        setPropertyMovingId,
        addAlerts,
        setCardMovingId,
        setExcludedAnimalId,
        router,
    ]);

    if (opponents.length === 0) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <div>
                {/* Opponent Cards Fixed at the Top */}
                <div
                    className="w-3/12 min-h-36"
                    style={{ top: 50, position: "absolute" }}
                >
                    <CardsHand
                        cards={opponents[0] ? opponents[0].cardsAmount : 0}
                    />
                </div>
                <div
                    className="w-6/12 min-h-64"
                    style={{ top: 50, left: 400, position: "absolute" }}
                >
                    <Animals
                        isDragDisabled={true}
                        animals={opponents[0].animals}
                        isMine={false}
                    />
                </div>
                {phase === "nutrition" && (
                    <div
                        className="w-1/12 min-h-64"
                        style={{ top: 300, right: 0, position: "absolute" }}
                    >
                        <FoodBase />
                    </div>
                )}
                <div
                    className="w-full min-h-64"
                    style={{ bottom: 122, position: "absolute" }}
                >
                    <Animals
                        isDragDisabled={false}
                        animals={me.animals}
                        isMine={true}
                    />
                </div>
                <div
                    className="w-full min-h-36"
                    style={{ bottom: 0, position: "absolute" }}
                >
                    <CardsHand cards={me.cards} />
                </div>
            </div>
        </div>
    );
}
