"use client";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import ApiResponse from "@/api/base";
import { MeAPIResponseBody } from "@/types/profile/me";

export function ProfileDropdown({
    data,
    isSuccess,
}: {
    data: ApiResponse<MeAPIResponseBody> | undefined;
    isSuccess: boolean;
}) {
    const router = useRouter();

    const handleLogout = async () => {
        await logoutAPI(router);

        deleteAccess();
        deleteRefresh();

        router.push("/login", { scroll: false });
    };

    let avatar: JSX.Element = <Skeleton className="h-10 w-10 rounded-full" />;

    if (data && isSuccess) {
        avatar = (
            <Avatar>
                <AvatarImage src={data.data?.avatar_url} />
                <AvatarFallback></AvatarFallback>
            </Avatar>
        );
    }

    return (
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
    );
}
