import { cookies } from 'next/headers';
import { JWTPayload } from "@/types/auth/jwt";

async function getCookiesStore() {
    return cookies()
}


async function getCookie(name: string) {
    const cookiesStore = await getCookiesStore()

    return cookiesStore.get(name);
}

export async function getAccess() {
    return await getCookie("access")
}

export async function getAccessPayload() {
    const accessToken = (await getAccess())?.value
    const decrypt = (await import('@/app/lib/session')).decrypt
    const payload: JWTPayload | undefined = await decrypt(accessToken)

    return payload
}

export async function getRefresh() {
    return await getCookie("refresh")

}

export async function getRefreshPayload() {
    const refreshToken = (await getRefresh())?.value
    const decrypt = (await import('@/app/lib/session')).decrypt
    const payload = await decrypt(refreshToken)

    return payload
}


async function setCookie(name: string, value: string) {
    const cookiesStore = await getCookiesStore()

    cookiesStore.set(name, value, {
        secure: true,
        sameSite: 'lax',
        path: '/',
    });
}


export async function setAccess(token: string) {
    await setCookie('access', token)
}

export async function setRefresh(token: string) {
    await setCookie('refresh', token)
}


async function deleteCookie(name: string) {
    const cookiesStore = await getCookiesStore()

    cookiesStore.delete(name)
}

export async function deleteAccess() {
    await deleteCookie( "access")
}

export async function deleteRefresh() {
    await deleteCookie("refresh")
}
