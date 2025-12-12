"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function BlogCard({ blog, index = 0 }: { blog: any; index?: number }) {

    const formatDate = (date: Date | string) => {
        return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            <Link href={`/blogs/${blog.slug || "#"}`}>
                <Card className="group h-full overflow-hidden border-border/50 bg-card transition-all hover:border-primary/50 hover:shadow-md">
                    <div className="relative aspect-video overflow-hidden">
                        <Image
                            src={blog.image || "/placeholder.jpg"}
                            alt={blog.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                                {blog.category}
                            </Badge>
                        </div>
                    </div>
                    <CardHeader className="p-5 pb-2">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                            <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{formatDate(blog.createdAt)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{blog.readingTime || 5} min read</span>
                            </div>
                        </div>
                        <h3 className="line-clamp-2 text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                            {blog.title}
                        </h3>
                    </CardHeader>
                    <CardContent className="p-5 py-2">
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                            {blog.content}
                        </p>
                    </CardContent>
                    <CardFooter className="p-5 pt-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-primary">
                            Read Article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                    </CardFooter>
                </Card>
            </Link>
        </motion.div>
    );
}
