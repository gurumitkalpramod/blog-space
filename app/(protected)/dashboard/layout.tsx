import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    if (!session?.user) redirect("/sign-in");

    const isAdmin = (session.user as any).role === "ADMIN";

    return (
        <div className="container mx-auto py-8 px-4 md:px-6">
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-4">
                <div className="col-span-3">
                    {children}
                </div>
                <div className="col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-2">
                            <Link href="/dashboard/profile">
                                <Button variant="outline" className="w-full justify-start">Update Profile</Button>
                            </Link>

                            {isAdmin && (
                                <Link href="/dashboard/manage-users">
                                    <Button variant="outline" className="w-full justify-start">Manage Users</Button>
                                </Link>
                            )}
                            <form action={async () => {
                                "use server"
                                await import("@/app/actions/authAction").then(m => m.logout())
                            }}>
                                <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">Sign Out</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};