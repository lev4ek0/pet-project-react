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

