import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Results } from "@/stores/cardStore";
import { PlayerResultComponent } from "./playerResult";

export const ResultsComponent = ({ results }: { results: Results }) => {
    return (
        <Card className="p-6 rounded-lg shadow-lg w-96 mx-auto">
            <Label>Результаты</Label>
            <div className="flex justify-around mb-4">
                {results.players.map((playerResult) => (
                    <PlayerResultComponent
                        key={playerResult.id}
                        playerResult={playerResult}
                    />
                ))}
            </div>
        </Card>
    );
};
