import { auth } from "@/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { ProfileForm } from "./profile-form";

export default async function ProfilePage() {
    const session = await auth();
    if (!session?.user) redirect("/sign-in");

    return (
        <div className="max-w-2xl space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Profile Details</CardTitle>
                    <CardDescription>Manage your public profile information.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ProfileForm user={session.user} />
                </CardContent>
            </Card>
        </div>
    );
}