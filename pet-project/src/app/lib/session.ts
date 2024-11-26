import { JWTPayload } from "@/types/jwt";
import { jwtDecode } from "jwt-decode";

export function decrypt(session: string | undefined = "") {
    try {
        return jwtDecode<JWTPayload>(session);
    } catch {}
}
