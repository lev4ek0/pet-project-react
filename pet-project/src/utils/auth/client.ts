import { decrypt } from "@/app/lib/session";
import { JWTPayload } from "@/types/jwt";
import Cookies from "js-cookie";

export function setCookie(
    name: string,
    value: string,
    expirationM: number | undefined = undefined,
) {
    const cookiesStore = Cookies;
    let expirationDate;

    if (expirationM) {
        expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + expirationM);
    }

    cookiesStore.set(name, value, {
        secure: true,
        sameSite: "lax",
        path: "/",
        expires: expirationDate,
    });
}

export function setAccess(token: string) {
    setCookie("access", token);
}

export function setRefresh(token: string) {
    setCookie("refresh", token);
}

export function deleteCookie(name: string) {
    const cookiesStore = Cookies;

    cookiesStore.remove(name);
}

export function deleteAccess() {
    deleteCookie("access");
}

export function deleteRefresh() {
    deleteCookie("refresh");
}

function getCookie(name: string) {
    const cookiesStore = Cookies;

    return cookiesStore.get(name);
}

export function getAccess() {
    return getCookie("access");
}

export function getAccessPayload() {
    const accessToken = getAccess();
    const payload: JWTPayload | undefined = decrypt(accessToken);

    return payload;
}

export function getRefresh() {
    return getCookie("refresh");
}

export function getRefreshPayload() {
    const refreshToken = getRefresh();
    const payload = decrypt(refreshToken);

    return payload;
}
