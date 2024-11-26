export interface GetRoomAPIResponseBody {
    id: string;
    current_players: number;
    limit_players: number;
    mode: string;
    status: string;
    etl: number;
}
