'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import meAPI, {meAPIPatch} from '@/api/profile/me'
import { useRouter } from 'next/navigation'

export function ProfileForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await meAPI(router)

            if (data) {
                console.log(data.avatar_url)
                setEmail(data.email)
                setName(data.nickname)
                setAvatar(data.avatar_url)
            }
        };

        fetchData();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await meAPIPatch({nickname: name}, router)
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
                        <Avatar className="w-20 h-20">
                            <AvatarImage src={avatar} alt="Profile picture" />
                            <AvatarFallback>Avatar</AvatarFallback>
                        </Avatar>
                        <Button variant="outline">Изменить аватар</Button>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name">Никнейм</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Почта</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <Button type="submit" full>Сохранить изменения</Button>
                </form>
            </CardContent>
        </Card>
    )
}

