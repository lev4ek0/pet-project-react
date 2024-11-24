'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import meAPI, { meAPIPatch } from '@/api/profile/me'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect, useState } from "react"

export function ProfileForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [inputAvatar, setInputAvatar] = useState(<Skeleton className="h-20 w-20 rounded-full" />);
    const [inputUsername, setInputUsername] = useState(<Skeleton className="h-9 w-full" />);
    const [inputEmail, setInputEmail] = useState(<Skeleton className="h-9 w-full" />);

    const router = useRouter();

    const me = useQuery({
        queryKey: ['me'],
        queryFn: async () => meAPI(router)
    });

    useEffect(() => {
        if (me.data && me.status === 'success') {
            setAvatar(me.data.data?.avatar_url || '');
            setName(me.data.data?.nickname || '');
            setEmail(me.data.data?.email || '');
        }
    }, [me.data, me.status]);

    useEffect(() => {
        setInputAvatar(
            <Avatar className="w-20 h-20">
                <AvatarImage src={avatar} />
                <AvatarFallback><Skeleton className="h-20 w-20 rounded-full" /></AvatarFallback>
            </Avatar>
        );

        setInputUsername(
            <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        );

        setInputEmail(
            <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        );
    }, [name, email, avatar]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await meAPIPatch({ nickname: name }, router)
        console.log('Profile updated:', { name, email })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Информация о профиле</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center space-x-4">
                        {inputAvatar}
                        <Button variant="outline">Изменить аватар</Button>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name">Никнейм</Label>
                        {inputUsername}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Почта</Label>
                        {inputEmail}
                    </div>
                    <Button type="submit" full>Сохранить изменения</Button>
                </form>
            </CardContent>
        </Card>
    )
}

