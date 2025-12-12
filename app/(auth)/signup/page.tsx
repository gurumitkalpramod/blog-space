"use client"

import { signUp } from "@/app/actions/authAction";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Rocket } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const firstName = formData.get("first-name") as string;
        const lastName = formData.get("last-name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const result = await signUp({ firstName, lastName, email, password });

        if (result.error) {
            setError(result.error);
            setIsLoading(false);
        } else {
            // Redirect to sign in or auto login
            router.push("/sign-in");
        }
    }

    return (
        <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-12 px-4">
            <Card className="w-full max-w-md border-border/60 bg-card/50 backdrop-blur-sm shadow-xl">
                <CardHeader className="space-y-1 flex flex-col items-center text-center">
                    <div className="rounded-full bg-primary/10 p-3 mb-2">
                        <Rocket className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                    <CardDescription>
                        Enter your information to get started
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first-name">First name</Label>
                                <Input id="first-name" name="first-name" placeholder="Max" required disabled={isLoading} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last-name">Last name</Label>
                                <Input id="last-name" name="last-name" placeholder="Robinson" required disabled={isLoading} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="m@example.com" required disabled={isLoading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" required disabled={isLoading} />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <Button className="w-full font-bold" size="lg" type="submit" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Create Account
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 text-center text-sm text-muted-foreground">
                    <p>
                        Already have an account?{" "}
                        <Link href="/sign-in" className="font-semibold text-primary hover:underline">
                            Sign in
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}