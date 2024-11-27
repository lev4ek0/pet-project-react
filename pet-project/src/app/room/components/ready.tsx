import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
} from "@/components/ui/alert-dialog";

interface AlertDialogReadyProps {
    readyGame: boolean;
    readyAction: () => Promise<void>;
}

export function AlertDialogReady({
    readyGame,
    readyAction,
}: AlertDialogReadyProps) {
    return (
        <AlertDialog open={readyGame}>
            <AlertDialogContent>
                <AlertDialogHeader className="items-center">
                    <AlertDialogTitle>Вы готовы?</AlertDialogTitle>
                    <AlertDialogDescription />
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction
                        onClick={readyAction}
                        className="min-w-40"
                    >
                        ДА
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
