export interface JoinRoomAPIRequestBody {
    players: number;
    mode: string;
}

export interface JoinRoomAPIResponseBody {
    id: string;
    current_players: number;
    limit_players: number;
    mode: string;
    status: string;
    etl: number;
}
