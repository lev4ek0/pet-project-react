import { Animal, AnimalProperty, Card, GetGameAPIResponseBody } from "@/api/game/types/get";
import React, { useEffect, useState } from "react";
import "./GameDisplay.css";
import { useCardStore } from "@/providers/cardProvider";
import {
    DragDropContext,
    Draggable,
    Droppable,
} from "@hello-pangea/dnd";
import { Card as CardComponents } from "@/components/ui/card";

interface GameDisplayProps {
    gameData: GetGameAPIResponseBody;
}


const reorder = (state, startIndex, endIndex) => {
    const cards = Array.from(state.myCards);
    const animals = Array.from(state.myAnimals);
    cards.splice(startIndex, 1);

    const uuid = crypto.randomUUID().toString()
    const animal = {
        id: uuid,
        properties: [],
        food: 0,
        fat_food: 0,
    }
    animals.splice(endIndex, 0, animal);

    const myState: { myCards: Card[], myAnimals: Animal[] } = {
        myCards: cards,
        myAnimals: animals
    };
    return myState;
};


const recombine = (state, startIndex, endIndex) => {
    const cards: Card[] = Array.from(state.myCards);
    const animals: Animal[] = Array.from(state.myAnimals);
    const card = cards.splice(startIndex, 1);

    const properties: AnimalProperty[] = card[0].properties.map(property => ({
        id: property.id,
        chances: property.chances,
        connected_animal_id: null,
        is_activated: false,
    }))
    animals.find(
        (cardStore) => endIndex === cardStore.id,
    )?.properties.push(...properties)

    const myState: { myCards: Card[], myAnimals: Animal[] } = {
        myCards: cards,
        myAnimals: animals
    };
    return myState;
};

export function GameDisplay({ gameData }: GameDisplayProps) {
    const [myState, setMyState] = useState({
        myCards: gameData.users[0].cards,
        myAnimals: []
    })

    const { cards: cardsStore, properties: propertiesStore } = useCardStore(
        (state) => state,
    );

    const opponent = gameData.users[0];
    const myUser = gameData.users[1];

    function renderAnimalCards(animals: Animal[]) {
        return animals.map((animal, index) => (
            <Draggable isDragDisabled={true} key={animal.id} draggableId={animal.id} index={index}>
                {(provided) => (
                    <div ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps} 
                            style={{
                                transform: provided.draggableProps.style?.transform ? "translate(0px, 0px)": undefined
                            }}
                            className="flex flex-col space-y-2 mx-4">
                        {animal.properties.map((property, index) => (
                            <CardComponents
                                className="w-40 h-10"
                                key={index}
                            > 
                                <p>{propertiesStore
                                .find(
                                    (propertyStore) => property.id === propertyStore.id,
                                )?.name}</p>
                            </CardComponents>
                        ))}
                        
                        <CardComponents
                            className="w-40 h-32"
                        >
                            <p>Food: {animal.food}</p>
                            <p>Fat Food: {animal.fat_food}</p>
                        </CardComponents>
                    </div>
                )}
            </Draggable>
        ));
    }

    function renderCardProperties(cards: Card[] | number) {
        console.log(cards)

        return Array.isArray(cards) ? (
            cards.map((card, index) => (
                <Draggable
                    key={`${card.id}-${index}`}
                    draggableId={`${card.id}-${index}`}
                    index={index}
                >
                    {(provided, snapshot) => (                        
                        <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                                // default item style
                                padding: '8px 16px',
                                // default drag style
                                ...provided.draggableProps.style,
                                // customized drag style
                                background: snapshot.isDragging
                                  ? 'pink'
                                  : 'white',
                              }}
                            ref={provided.innerRef}
                            className={`card-custom w-28 h-28 flex flex-col justify-between mr-[-${70}px]`}
                            key={`${card.id}-${index}`}
                        >
                            {cardsStore
                                .find(
                                    (cardStore) => card.id === cardStore.id,
                                )
                                ?.properties.map((property, index) => (
                                    <h4 className={index === 0 ? "h4-first" : "h4-other"}
                                        key={`${property.id}-${index}`}
                                    >
                                        {property.name}
                                    </h4>
                                ))}
                        </div>
                    )}
                </Draggable>
            ))
        ) : (
            <div
                className="card-container"
                style={{ width: "112px" }}
            >
                {[...Array(cards)].map((_, index) => (
                    <div
                        className="card w-28 h-28"
                        key={index}
                    >
                        <h4></h4>
                    </div>
                ))}
            </div>
        );
    }

    function onDragEnd(result) {
        console.log(result)
        if ((!result.destination && !result.combine) || result.source?.droppableId === "animals" || result.source?.droppableId === result.destination?.droppableId) {
            return;
        }

        if (result.destination) {
            const items = reorder(
                myState,
                result.source.index,
                result.destination.index
            );

            setMyState({ myCards: items.myCards, myAnimals: items.myAnimals })
        }

        if (result.combine) {
            const items = recombine(
                myState,
                result.source.index,
                result.combine.draggableId
            );

            setMyState({ myCards: items.myCards, myAnimals: items.myAnimals })
        }
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
                {/* <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        backgroundColor: "white",
                        borderBottom: "1px solid #ccc",
                        padding: "10px",
                        zIndex: 10,
                    }}
                >
                    <div className="cards-container">
                        {renderCardProperties(opponent.cards)}
                    </div>
                </div>
                <div
                    style={{
                        position: "fixed",
                        top: 132,
                        left: 0,
                        width: "100%",
                        backgroundColor: "white",
                        borderBottom: "1px solid #ccc",
                        padding: "10px",
                        zIndex: 10,
                    }}
                >
                    <div className="cards-container">
                        {renderAnimalCards(opponent)}
                    </div>
                </div> */}

                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="w-full min-h-72" style={{ bottom: 122, position: "absolute" }}>
                        <Droppable droppableId="animals" key="111" direction="horizontal" isCombineEnabled={true}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="w-full min-h-72"
                                    style={{
                                        width: "100%",
                                        backgroundColor: "white",
                                        borderTop: "1px solid #ccc",
                                        padding: "10px",
                                        display: "flex"
                                    }}
                                >
                                    {renderAnimalCards(myState.myAnimals)}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                    <div className="w-full min-h-36" style={{ bottom: 0, position: "absolute" }}>
                        <Droppable droppableId="cards" key="222" direction="horizontal">
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    style={{
                                        width: "100%",
                                        backgroundColor: "white",
                                        borderTop: "1px solid #ccc",
                                        padding: "10px",
                                        display: "flex"
                                    }}
                                >
                                    {renderCardProperties(myState.myCards)}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                </DragDropContext>
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
