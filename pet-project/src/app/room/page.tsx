"use client";

import getRoomAPI from "@/api/room/get";
import leaveRoomAPI from "@/api/room/leave";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useAlertStore } from "@/providers/alertsProvider";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect } from "react";

export default function Room() {
    const router = useRouter();
    const { addAlerts } = useAlertStore((state) => state);

    const { data, isSuccess } = useQuery({
        queryKey: ["room"],
        queryFn: async () => getRoomAPI(router),
        staleTime: 0,
        gcTime: 0,
    });

    const response = data?.data;

    useEffect(() => {
        if (isSuccess && !data.isOk) {
            router.replace("/");
        }
        if (isSuccess && data.data?.status === "game") {
            router.replace("/game");
        }
    }, [isSuccess, data, router]);

    async function exitRoom() {
        const { isOk, errors } = await leaveRoomAPI(router);
        if (isOk) {
            router.replace("/");
        } else {
            addAlerts(errors);
        }
    }

    return (
        <>
            <Breadcrumb className="py-5">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Главная</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/room">
                            Комната ожидания
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="relative h-3/6 bg-gray-100">
                {response?.id}
                <br />
                {response?.current_players}
                <br />
                {response?.etl}
                <br />
                {response?.limit_players}
                <br />
                {response?.status}
                <br />
                {response?.mode}
                <br />
            </div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button type="button" variant="destructive">
                        Отменить поиск
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader className="items-center">
                        <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            className="min-w-40"
                            onClick={exitRoom}
                        >
                            Да
                        </AlertDialogCancel>
                        <AlertDialogAction className="min-w-40">
                            Продолжить поиск
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
