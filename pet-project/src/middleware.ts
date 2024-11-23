import 'server-only'

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from './app/lib/session';
import refreshAPI from './api/auth/refresh';
import { deleteAccess, deleteRefresh, getAccessPayload, getRefresh, setAccess, setRefresh } from './utils/auth/server';
import { isExpiredToken } from './utils/auth/common';

const PUBLIC_FILE = /\.(.*)$/;


export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.startsWith("/static") ||
        PUBLIC_FILE.test(pathname)
    )
        return NextResponse.next();

    const payloadAccess = await getAccessPayload()

    if (!pathname.startsWith("/login") && isExpiredToken(payloadAccess)) {

        const refresh = (await getRefresh())?.value
        const payloadRefresh = decrypt(refresh)

        if (!refresh || !payloadRefresh || isExpiredToken(payloadRefresh)) {
            await deleteAccess()
            await deleteRefresh()
            return NextResponse.redirect(new URL('/login', request.url))
        }

        const body = { refresh_token: refresh }

        const { data } = await refreshAPI(body)

        if (!data) {
            await deleteAccess()
            await deleteRefresh()
            return NextResponse.redirect(new URL('/login', request.url))
        }

        await setAccess(data.access_token)
        await setRefresh(data.refresh_token)

        return NextResponse.redirect(new URL('/profile', request.url))

    }

    if (pathname.startsWith("/login") && !isExpiredToken(payloadAccess)) {
        return NextResponse.redirect(new URL('/profile', request.url))
    }

    return NextResponse.next()
}
