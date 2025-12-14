import { Github, Linkedin, Rocket } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full border-t bg-background py-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="flex items-center gap-2">
                            <Rocket className="h-6 w-6 text-primary" />
                            <span className="text-xl font-bold tracking-tight">BlogSpace</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            A modern platform for sharing your thoughts and ideas with the world.
                            Built with the latest technologies.
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Platform</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/blogs" className="hover:text-primary">Browse Blogs</Link></li>
                            <li><Link href="/pricing" className="hover:text-primary">Pricing</Link></li>
                            <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                            <li><Link href="/guides" className="hover:text-primary">Guides</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Legal</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
                            <li><Link href="/cookies" className="hover:text-primary">Cookie Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Newsletter</h3>
                        <p className="mb-4 text-sm text-muted-foreground">
                            Subscribe to our newsletter to get the latest updates.
                        </p>
                        {/* Input stub - functionality not required yet */}
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                                Join
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
                    <div className="flex flex-col items-center gap-2 sm:items-start">
                        <p className="text-xs text-muted-foreground">
                            &copy; {new Date().getFullYear()} BlogSpace. All rights reserved.
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Developed by <span className="font-medium text-foreground">Gurumitkal Pramod</span>
                        </p>
                        <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground sm:items-start">
                            <div>
                                <span className="font-medium">GitHub: </span>
                                <Link
                                    href="https://github.com/gurumitkalpramod"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-primary hover:underline"
                                >
                                    https://github.com/gurumitkalpramod
                                </Link>
                            </div>
                            <div>
                                <span className="font-medium">LinkedIn: </span>
                                <Link
                                    href="https://www.linkedin.com/in/pramod-gurumitkal-a04456222"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-primary hover:underline"
                                >
                                    https://www.linkedin.com/in/pramod-gurumitkal-a04456222
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            href="https://github.com/gurumitkalpramod"
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted-foreground transition-colors hover:text-primary"
                        >
                            <Github className="h-4 w-4" />
                            <span className="sr-only">GitHub</span>
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/pramod-gurumitkal-a04456222"
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted-foreground transition-colors hover:text-primary"
                        >
                            <Linkedin className="h-4 w-4" />
                            <span className="sr-only">LinkedIn</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
