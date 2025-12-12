"use client"

import { updateProfile } from "@/app/actions/userAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";

export function ProfileForm({ user }: { user: any }) {
    const [state, formAction, isPending] = useActionState(updateProfile, null);

    return (
        <form action={formAction} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user.email || ""} disabled className="bg-muted" />
                <p className="text-[0.8rem] text-muted-foreground">Email cannot be changed.</p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" value={user.role || "USER"} disabled className="bg-muted" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="name">Display Name</Label>
                <Input
                    id="name"
                    name="name"
                    defaultValue={user.name || ""}
                    placeholder="Enter your full name"
                />
                {state?.error && typeof state.error === 'object' && !Array.isArray(state.error) && state.error.name && (
                    <p className="text-red-500 text-sm">{state.error.name}</p>
                )}
            </div>

            {state?.error && typeof state.error === 'string' && <p className="text-red-500 text-sm">{state.error}</p>}
            {state?.success && <p className="text-green-500 text-sm">{state.success}</p>}

            <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save Changes"}
            </Button>
        </form>
    )
}
