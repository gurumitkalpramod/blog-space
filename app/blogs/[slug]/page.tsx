import { AnimationWrapper } from "@/app/_components/AnimationWrapper";
import { ShareButton } from "@/app/_components/ShareButton";
import { getBlogBySlug, getBlogs } from "@/app/actions/blogAction";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
    params: {
        slug: string;
    };
}

// Generate static params for all blogs
export async function generateStaticParams() {
    const blogs = await getBlogs();
    return blogs.map((blog) => ({
        slug: blog.slug,
    }));
}

export default async function BlogParamsPage({ params }: PageProps) {
    // Await params in case it's a promise (Next.js 15+ compatible)
    const { slug } = await Promise.resolve(params);
    const blog = await getBlogBySlug(slug);

    if (!blog) {
        notFound();
    }

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    return (
        <AnimationWrapper className="container mx-auto py-12 px-4 md:px-6 max-w-4xl">
            <Link href="/blogs" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blogs
            </Link>

            <div className="space-y-6">
                <div className="space-y-4">
                    <Badge variant="secondary" className="text-sm">{blog.category}</Badge>
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">
                        {blog.title}
                    </h1>
                    <div className="flex items-center gap-6 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <div className="relative bg-muted h-10 w-10 flex flex-shrink-0 items-center justify-center overflow-hidden rounded-full border">
                                {blog.author.image ? (
                                    <Image src={blog.author.image} alt={blog.author.name || "Author"} fill className="object-cover" />
                                ) : (
                                    <p className="text-lg font-bold">{blog.author.name?.charAt(0) || "A"}</p>
                                )}
                            </div>
                            <div className="flex flex-col text-sm">
                                <span className="font-medium text-foreground">{blog.author.name || "Anonymous"}</span>
                                <span>Author</span>
                            </div>
                        </div>
                        <div className="h-8 w-[1px] bg-border/60" />
                        <div className="flex flex-col text-sm gap-1">
                            <div className="flex items-center gap-1.5">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>{formatDate(blog.createdAt)}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{blog.readingTime} min read</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg border">
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none pt-8">
                    {/* Since we don't have a separate excerpt field, we can skip the highlighted excerpt 
                        or generate it. For now, we'll just show the content. 
                        Users might format content with markdown or line breaks. 
                        We'll use whitespace-pre-wrap to respect line breaks from textarea. 
                    */}
                    <div className="text-foreground/90 space-y-6 whitespace-pre-wrap">
                        {blog.content}
                    </div>
                </div>

                <div className="flex items-center justify-between border-t pt-8 mt-12">
                    <div className="flex flex-col gap-1">
                        <span className="text-sm text-muted-foreground">Share this article</span>
                        <div className="flex gap-2">
                            <ShareButton />
                            {/* Social share buttons */}
                        </div>
                    </div>
                </div>
            </div>
        </AnimationWrapper>
    );
}