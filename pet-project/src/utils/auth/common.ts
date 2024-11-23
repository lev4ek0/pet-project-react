import { JWTPayload } from "@/types/auth/jwt";

export function isExpiredToken(payload: JWTPayload | undefined) {
    const timestamp = Date.now() / 1000 + 10

    return !payload || timestamp > (payload["exp"] || 0)
}
