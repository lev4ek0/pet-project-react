import { JWTPayload } from "@/types/auth/jwt";
import { jwtDecode } from "jwt-decode";

 
export async function decrypt(session: string | undefined = '') {
    try {
        return jwtDecode<JWTPayload>(session)
    } catch {}
}
