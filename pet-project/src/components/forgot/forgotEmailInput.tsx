import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/providers/authProvider";

export default function EmailInput() {
    const { setForgotEmail, forgotEmail } = useAuthStore((state) => state);

    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Почта</Label>
            <Input
                id="email"
                onChange={(e) => setForgotEmail(e.target.value)}
                value={forgotEmail}
                type="email"
                placeholder="Почта"
                required
            />
        </div>
    );
}
