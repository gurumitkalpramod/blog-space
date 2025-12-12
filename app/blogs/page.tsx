
import { BlogCard } from "@/app/_components/BlogCard";
import { Metadata } from "next";
import { getBlogs } from "../actions/blogAction";

export const metadata: Metadata = {
    title: "All Blogs - BlogSpace",
    description: "Explore our collection of stories, guides, and insights.",
};

export default async function BlogsPage() {
    const blogs = await getBlogs();

    return (
        <div className="container mx-auto py-12 px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
                <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Our Blog</h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                    Thoughts, stories, and ideas from the BlogSpace team and community.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {blogs.length > 0 ? (
                    blogs.map((blog, index) => (
                        <BlogCard key={blog.id} blog={blog} index={index} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <p className="text-muted-foreground">No blogs found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
