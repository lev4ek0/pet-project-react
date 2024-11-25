"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logoutAPI from "@/api/auth/logout";
import { deleteAccess, deleteRefresh } from "@/utils/auth/client";
import meAPI from "@/api/profile/me";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
    const router = useRouter();

    const { data, status } = useQuery({
        queryKey: ["me"],
        queryFn: async () => meAPI(router),
    });

    let avatar: JSX.Element = <Skeleton className="h-10 w-10 rounded-full" />;

    if (data && status === "success") {
        avatar = (
            <Avatar>
                <AvatarImage src={data.data?.avatar_url} />
                <AvatarFallback></AvatarFallback>
            </Avatar>
        );
    }

    const handleLogout = async () => {
        await logoutAPI(router);

        deleteAccess();
        deleteRefresh();

        router.push("/login", { scroll: false });
    };

    return (
        <div className="relative h-screen bg-gray-100">
            <div className="absolute top-8 right-8">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>{avatar}</DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Link className="w-full	h-full" href="/profile">
                                    Профиль
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link className="w-full	h-full" href="/settings">
                                    Настройки
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                            Выйти
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="absolute bottom-8 right-8">
                <Button className="px-20 py-2 rounded-md">Играть</Button>
            </div>
        </div>
    );
}
