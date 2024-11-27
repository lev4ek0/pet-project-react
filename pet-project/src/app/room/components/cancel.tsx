import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogDescription,
} from "@/components/ui/alert-dialog";

interface AlertDialogCancelSearchProps {
    exitRoom: () => Promise<void>;
    seconds: number;
}

export function AlertDialogCancelSearch({
    exitRoom,
    seconds,
}: AlertDialogCancelSearchProps) {
    function formatSeconds(seconds: number) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="py-2 px-40 rounded-md w-full my-4">
                    Поиск матча
                    <div>{formatSeconds(seconds)}</div>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader className="items-center">
                    <AlertDialogTitle>Хотите отменить поиск?</AlertDialogTitle>
                    <AlertDialogDescription />
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="min-w-40" onClick={exitRoom}>
                        Да
                    </AlertDialogCancel>
                    <AlertDialogAction className="min-w-40">
                        Продолжить поиск
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
