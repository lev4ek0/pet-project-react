import { decrypt } from '@/app/lib/session';
import { JWTPayload } from '@/types/auth/jwt';
import Cookies from 'js-cookie';

function getCookiesStore() {
    return Cookies
}


function setCookie(name: string, value: string) {
    const cookiesStore = getCookiesStore()

    cookiesStore.set(name, value, {
        secure: true,
        sameSite: 'lax',
        path: '/',
    });
}


export function setAccess(token: string) {
    setCookie('access', token)
}

export function setRefresh(token: string) {
    setCookie('refresh', token)
}


function deleteCookie(name: string) {
    const cookiesStore = getCookiesStore()

    cookiesStore.remove(name)
}

export function deleteAccess() {
    deleteCookie("access")
}

export function deleteRefresh() {
    deleteCookie("refresh")
}


function getCookie(name: string) {
    const cookiesStore = getCookiesStore()

    return cookiesStore.get(name);
}


export function getAccess() {
    return getCookie("access")
}

export function getAccessPayload() {
    const accessToken = getAccess()
    const payload: JWTPayload | undefined = decrypt(accessToken)

    return payload
}

export function getRefresh() {
    return getCookie("refresh")

}

export function getRefreshPayload() {
    const refreshToken = getRefresh()
    const payload = decrypt(refreshToken)

    return payload
}
