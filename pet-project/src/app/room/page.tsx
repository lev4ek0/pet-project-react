"use client";

import getRoomAPI from "@/api/room/get";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    // const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ["room"],
        queryFn: async () => getRoomAPI(router),
    });

    const response = data?.data;

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
            <div className="relative h-screen bg-gray-100">
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
        </>
    );
}
