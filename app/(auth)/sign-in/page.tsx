"use client"

import { loginWithCredentials } from "@/app/actions/authAction";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Rocket } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);

        try {
            const result = await loginWithCredentials(formData);
            console.log(result, "result")
            if (!result.status) {
                setError(result.message || "Invalid credentials!");
                setIsLoading(false);
            } else {
                router.push("/dashboard");
            }
        } catch (e) {
            console.log(e, "e")
            setError("Invalid credentials!");
            setIsLoading(false);
        }
    }

    return (
        <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-12 px-4">
            <Card className="w-full max-w-md border-border/60 bg-card/50 backdrop-blur-sm shadow-xl">
                <CardHeader className="space-y-1 flex flex-col items-center text-center">
                    <div className="rounded-full bg-primary/10 p-3 mb-2">
                        <Rocket className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                    <CardDescription>
                        Enter your email to sign in to your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="m@example.com" required disabled={isLoading} />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link href="#" className="text-xs text-primary hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <Input id="password" name="password" type="password" required disabled={isLoading} />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <Button className="w-full font-bold" size="lg" type="submit" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Sign In
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 text-center text-sm text-muted-foreground">

                    <p>
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="font-semibold text-primary hover:underline">
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}

