"use client"

import { getBlogBySlug, updateBlog } from "@/app/actions/blogAction";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Since we are in a client component, we might need to fetch data via server action or have it passed as props.
// Ideally, the parent component (page.tsx) is a Server Component that fetches data and passes it here.
// But Next.js App Router params are accessible.
// Let's make the Page async server component and a client inner component? 
// Or just fetch in useEffect since we are already "use client" for the form?
// Mixing server actions in useEffect is fine.

export default function EditBlogPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const [isLoading, setIsLoading] = useState(true); // Loading initial data
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [blogId, setBlogId] = useState<string | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        category: "",
        type: "NORMAL",
        image: "",
        content: "",
        readingTime: ""
    });

    useEffect(() => {
        if (slug) {
            getBlogBySlug(slug).then((blog) => {
                if (blog) {
                    setBlogId(blog.id);
                    setFormData({
                        title: blog.title,
                        slug: blog.slug,
                        category: blog.category,
                        type: blog.type,
                        image: blog.image,
                        content: blog.content,
                        readingTime: blog.readingTime.toString()
                    });
                } else {
                    setError("Blog not found");
                }
                setIsLoading(false);
            });
        }
    }, [slug]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!blogId) return;

        setIsSaving(true);
        setError(null);

        const form = new FormData();
        form.append("title", formData.title);
        form.append("slug", formData.slug);
        form.append("category", formData.category);
        form.append("type", formData.type);
        form.append("image", formData.image);
        form.append("content", formData.content);
        form.append("readingTime", formData.readingTime);

        try {
            const result = await updateBlog(blogId, form);

            if (result.error) {
                if (typeof result.error === 'string') {
                    setError(result.error);
                } else {
                    setError("Please check all fields.");
                }
                setIsSaving(false);
            } else {
                router.push("/dashboard");
                router.refresh();
            }
        } catch (e) {
            setError("Something went wrong");
            setIsSaving(false);
        }
    }

    if (isLoading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin h-8 w-8" /></div>;
    if (error && !blogId) return <div className="text-center py-12 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto py-8 px-4 md:px-6 max-w-3xl">
            <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
            </Link>

            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Edit Blog</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Blog Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" value={formData.title} onChange={handleChange} placeholder="Enter blog title" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug</Label>
                            <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} placeholder="url-friendly-slug" required />
                            <p className="text-[0.8rem] text-muted-foreground">
                                This is the URL path for your blog.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="">Select Category</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Lifestyle">Lifestyle</option>
                                    <option value="Travel">Travel</option>
                                    <option value="Food">Food</option>
                                    <option value="Health">Health</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="type">Type</Label>
                                <select
                                    id="type"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="NORMAL">Normal</option>
                                    <option value="BANNER">Banner</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="readingTime">Reading Time (min)</Label>
                            <Input
                                id="readingTime"
                                name="readingTime"
                                type="number"
                                min="1"
                                value={formData.readingTime}
                                onChange={handleChange}
                                placeholder="e.g. 5"
                                required
                            />
                        </div>


                        <div className="space-y-2">
                            <Label htmlFor="image">Cover Image URL</Label>
                            <Input id="image" name="image" value={formData.image} onChange={handleChange} placeholder="https://..." required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                                id="content"
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                placeholder="Write your story here..."
                                className="min-h-[300px]"
                                required
                            />
                        </div>

                        {error && <p className="text-sm text-red-500">{error}</p>}

                        <div className="flex justify-end gap-4 pt-4">
                            <Link href="/dashboard">
                                <Button variant="outline" type="button">Cancel</Button>
                            </Link>
                            <Button type="submit" disabled={isSaving}>
                                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}