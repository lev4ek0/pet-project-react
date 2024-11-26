import { cookies } from "next/headers";
import { JWTPayload } from "@/types/jwt";
import { decrypt } from "@/app/lib/session";

export async function getCookie(name: string) {
    const cookiesStore = await cookies();

    return cookiesStore.get(name);
}

export async function getAccess() {
    return await getCookie("access");
}

export async function getAccessPayload() {
    const accessToken = (await getAccess())?.value;
    const payload: JWTPayload | undefined = decrypt(accessToken);

    return payload;
}

export async function getRefresh() {
    return await getCookie("refresh");
}

export async function getRefreshPayload() {
    const refreshToken = (await getRefresh())?.value;
    const payload = decrypt(refreshToken);

    return payload;
}

export async function setCookie(
    name: string,
    value: string,
    expirationM: number | undefined = undefined,
) {
    const cookiesStore = await cookies();
    let expirationDate;

    if (expirationM) {
        expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 1);
    }

    cookiesStore.set(name, value, {
        secure: true,
        sameSite: "lax",
        path: "/",
        expires: expirationDate,
    });
}

export async function setAccess(token: string) {
    await setCookie("access", token);
}

export async function setRefresh(token: string) {
    await setCookie("refresh", token);
}

async function deleteCookie(name: string) {
    const cookiesStore = await cookies();

    cookiesStore.delete(name);
}

export async function deleteAccess() {
    await deleteCookie("access");
}

export async function deleteRefresh() {
    await deleteCookie("refresh");
}
