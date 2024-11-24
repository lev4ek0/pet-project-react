'use client'

import { ProfileStoreProvider } from "@/providers/profileProvider";
import { Profile } from "./profile";

export default function Page() {
    return <>
        <ProfileStoreProvider>
            <Profile />
        </ProfileStoreProvider>
    </>
}
