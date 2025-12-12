"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "./AnimationWrapper";

export function FeaturedHero({ blog }: { blog: any }) {
    if (!blog) return null;

    return (
        <section className="relative w-full overflow-hidden rounded-3xl bg-muted/30 p-4 sm:p-8 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                <FadeIn className="order-2 lg:order-1 flex flex-col items-start gap-4">
                    <Badge variant="default" className="w-fit">{blog.category}</Badge>
                    <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-foreground">
                        {blog.title}
                    </h1>
                    <p className="max-w-xl text-lg text-muted-foreground line-clamp-3">
                        {blog.content}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                        <div className="flex items-center gap-2">
                            <div className="relative bg-muted h-8 flex items-center justify-center w-8 overflow-hidden rounded-full">
                                <p className="text-lg font-bold">{blog.author?.name.charAt(0)}</p>
                            </div>
                            <span className="font-medium text-foreground">{blog.author?.name}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{blog.readingTime} min read</span>
                        </div>
                    </div>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <Link href={`/blogs/${blog.slug}`}>
                            <Button size="lg" className="rounded-full px-8 text-base">
                                Read Article <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </FadeIn>

                <FadeIn className="order-1 lg:order-2" delay={0.2}>
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl">
                        <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-cover transition-transform duration-700 hover:scale-105"
                            priority
                        />
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
