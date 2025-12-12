"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { Menu, Rocket } from "lucide-react";
import { User } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";



export function Navbar({ user }: { user: User | null | undefined }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const navLinks = user ? [
        { href: "/", label: "Home" },
        { href: "/blogs", label: "Blogs" },
        { href: "/dashboard", label: "Dashboard" },
    ] : [
        { href: "/", label: "Home" },
        { href: "/blogs", label: "Blogs" },
    ];
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-8">
                <Link href="/" className="flex items-center gap-2">
                    <Rocket className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold tracking-tight">BlogSpace</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === link.href
                                ? "text-primary"
                                : "text-muted-foreground"
                                }`}
                        >
                            {link.label}
                            {pathname === link.href && (
                                <motion.div
                                    layoutId="navbar-underline"
                                    className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-primary hidden"
                                />
                            )}
                        </Link>
                    ))}
                    {
                        !user && (
                            <div className="flex items-center gap-4 ml-2">
                                <Link href="/sign-in">
                                    <Button variant="ghost" size="sm">
                                        Sign In
                                    </Button>
                                </Link>
                                <Link href="/signup">
                                    <Button size="sm" className="rounded-full px-6">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        )
                    }
                </nav>

                {/* Mobile Nav */}
                <div className="md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <div className="flex flex-col gap-6 mt-10">
                                <Link href="/" className="flex items-center gap-2 mb-4" onClick={() => setIsOpen(false)}>
                                    <Rocket className="h-6 w-6 text-primary" />
                                    <span className="text-xl font-bold">BlogSpace</span>
                                </Link>
                                <nav className="flex flex-col gap-4">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`text-lg font-medium transition-colors hover:text-primary ${pathname === link.href
                                                ? "text-primary"
                                                : "text-muted-foreground"
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </nav>
                                <div className="flex flex-col gap-3 mt-4">
                                    <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                                        <Button variant="outline" className="w-full">
                                            Sign In
                                        </Button>
                                    </Link>
                                    <Link href="/signup" onClick={() => setIsOpen(false)}>
                                        <Button className="w-full">Get Started</Button>
                                    </Link>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
