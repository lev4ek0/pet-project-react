import googleLinkAPI, { googleUnlinkAPI } from "@/api/auth/oauth2/google";
import vkLinkAPI, { vkUnlinkAPI } from "@/api/auth/oauth2/vk";
import meAPI from "@/api/profile/me";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { OauthAccount } from "@/types/profile/me";
import { faGoogle, faVk } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function SocialMediaLinks() {
    const router = useRouter();
    const [oauthAccounts, setOauthAccounts] = useState<OauthAccount[]>([]);
    const queryClient = useQueryClient();

    const me = useQuery({
        queryKey: ['me'],
        queryFn: async () => meAPI(router)
    });

    const isAccountLinked = (name: string) => {
        return oauthAccounts.some(account => account.oauth_name === name);
    };

    async function linkAccount(network: string) {
        let url = ""
        if (network === 'vk') {
            const response = await vkLinkAPI(true, router);
            url = response.data?.url || ""
        } else {
            const response = await googleLinkAPI(true, router);
            url = response.data?.url || ""
        }
        
        router.replace(url)
    }

    async function unlinkAccount(network: string) {
        let isOk = true
        if (network === 'vk') {
            const response = await vkUnlinkAPI(router)
            console.log(response)
            isOk = response.isOk
        } else {
            const response = await googleUnlinkAPI(router)
            isOk = response.isOk
        }

        if (isOk) {
            console.log(223)
            queryClient.invalidateQueries({ queryKey: ['me'] })
        }
    }

    const socialAccount = (network: string) => {
        return isAccountLinked(network) ? (
            <>
                <span>{oauthAccounts.find(account => account.oauth_name === network)?.account_email}</span>
                <Button variant="outline" onClick={async () => {await unlinkAccount(network)}}>Удалить</Button>
            </>
        ) : (
            <Button variant="outline" onClick={async () => {await linkAccount(network)}}>Привязать</Button>
        )
    }

    const socialAccountSkeleton = () => {
        return (
            <>
                <Skeleton className="h-9 w-48" />
                <Skeleton className="h-9 w-24" />
            </>
        )
    }

    useEffect(() => {
        if (me.data && me.status === 'success') {
            setOauthAccounts(me.data?.data?.oauth_accounts || []);
        }
    }, [me.data, me.status]);
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Учётные записи социальных сетей</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {['vk', 'google'].map((network) => (
                    <div key={network} className="flex items-center space-x-4">
                        <FontAwesomeIcon className="h-9 w-9" icon={network === 'vk' ? faVk : faGoogle} />
                        {me.status === "pending" ? socialAccountSkeleton() : socialAccount(network)}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
