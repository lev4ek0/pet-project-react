const socketUrl = "wss://lev4ek.ru/api/game/ws/room";

export function getSocketUrl(token: string, roomId: string) {
    const socketConnetionUrl = `${socketUrl}_${roomId}_?token=${token}`;

    return socketConnetionUrl;
}
