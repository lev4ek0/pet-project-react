'use client';

import React, { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Login } from './login';
import { useAlertStore } from '@/providers/alertsProvider';

function LoginPageWithSearchParams() {
    const searchParams = useSearchParams();
    const { addAlerts } = useAlertStore((state) => state);
    const router = useRouter();

    useEffect(() => {
        const errors = [];

        let index = 0;
        while (true) {
            const error = searchParams.get(`error${index}`);
            if (error === null) break;
            errors.push(decodeURIComponent(error));
            index++;
        }

        addAlerts(errors);
        router.replace('/login', {
            scroll: false,
        });
    }, [searchParams, addAlerts, router]);

    return (
        <div className="justify-center inline-flex items-center w-full h-full">
            <Login />
        </div>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginPageWithSearchParams />
        </Suspense>
    );
}
