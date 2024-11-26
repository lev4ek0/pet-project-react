import { PUBLIC_PREFIXES } from "../constants";

export function getIsPublicPath(pathname: string) {
    return PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}
