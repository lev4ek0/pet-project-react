const socketUrl = "wss://lev-4-ek.online/api/game/ws/room";

export function getSocketUrl(token: string, roomId: string) {
    const socketConnetionUrl = `${socketUrl}_${roomId}_?token=${token}`;

    return socketConnetionUrl;
}
