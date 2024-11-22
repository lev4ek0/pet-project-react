'use client'

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import logoutAPI from '@/api/auth/logout';
import { deleteAccess, deleteRefresh } from '@/utils/auth/client';

export function Profile() {
    const router = useRouter();

    const handleLogout = async () => {
        await logoutAPI()

        deleteAccess()
        deleteRefresh()

        router.push('/login', { scroll: false });
    };

    return (
        <>
            <div className="mt-10 text-center text-3xl/9 font-bold tracking-tight text-gray-900">Profile</div>
            <Link href='/'>Home</Link>
            <button
                onClick={handleLogout}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
                Logout
            </button>
        </>
    );
}
