import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/providers/authProvider";

export default function RePasswordInput() {
    const { setResetRePassword, resetRePassword } = useAuthStore(
        (state) => state,
      )

    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <div className="flex items-center justify-between">
                <Label htmlFor="password">Повторите пароль</Label>
            </div>
            <Input onChange={(e) => setResetRePassword(e.target.value)} value={resetRePassword} type="password" autoComplete="new-password" placeholder="Пароль" required />
        </div>
    )
}
