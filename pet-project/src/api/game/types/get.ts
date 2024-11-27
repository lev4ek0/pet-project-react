export interface GetGameAPIResponseBody {
    id: string;
    users: User[];
    move_order: MoveOrder[];
    current_food: number;
    turn_time: number;
    phase: "nutrition" | "evolution" | "end";
    etl: number;
    last_move: string;
    results: null | Results;
    chances: Chance[];
    cards_left: number;
}

export interface User {
    id: string;
    in_game: boolean;
    name: string;
    animals: Animal[];
    cards: number | Card[];
}

export interface Animal {
    id: string;
    properties: AnimalProperty[];
    food: number;
    fat_food: number;
}

export interface AnimalProperty {
    id: string;
    chances: null | number;
    connected_animal_id: string | null;
    is_activated: boolean;
}

export interface Card {
    id: string;
    properties: Property[];
}

export interface Property {
    id: string;
    chances: null | number;
}

interface MoveOrder {
    is_fold: boolean;
    player_id: string;
}

interface Chance {
    id: string;
    items: ChanceItem[];
}

interface ChanceItem {
    amount: number;
    total_cards_needed_for_next_level: number;
    level: number;
    property: PropertyDetail;
}

interface PropertyDetail {
    id: string;
    name: string;
    chances: Chances;
}

interface Chances {
    [key: string]: number;
}

interface Results {
    players: PlayerResult[];
}

interface PlayerResult {
    id: string;
    place: number;
    rating: number;
    coins: number;
    points: number;
}
