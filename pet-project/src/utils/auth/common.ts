import { JWTPayload } from "@/types/auth/jwt";

export function isExpiredToken(payload: JWTPayload | undefined, timestamp: number) {
    return !payload || timestamp > (payload["exp"] || 0)
}
