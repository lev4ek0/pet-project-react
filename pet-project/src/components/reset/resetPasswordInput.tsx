import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/providers/authProvider";

export default function PasswordInput() {
    const { setResetPassword, resetPassword } = useAuthStore(
        (state) => state,
      )

    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <div className="flex items-center justify-between">
                <Label htmlFor="password">Пароль</Label>
            </div>
            <Input onChange={(e) => setResetPassword(e.target.value)} value={resetPassword} type="password" autoComplete="new-password" placeholder="Пароль" required />
        </div>
    )
}
