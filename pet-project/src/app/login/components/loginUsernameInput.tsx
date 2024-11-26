import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/providers/authProvider";

export default function UsernameInput() {
    const { setLoginName, loginName } = useAuthStore((state) => state);

    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Логин</Label>
            <Input
                id="email"
                onChange={(e) => setLoginName(e.target.value)}
                value={loginName}
                placeholder="Логин"
                autoComplete="email"
                required
            />
        </div>
    );
}
