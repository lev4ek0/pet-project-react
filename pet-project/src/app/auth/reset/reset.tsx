'use client'

import { ResetForm } from "@/components/reset/resetForm";
import { Suspense } from "react";


export function ResetPageWithSearchParams() {
    return (
        <>
            <ResetForm />
        </>
    );
}


export function Reset() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPageWithSearchParams />
        </Suspense>
    );
}