
import { Button } from "@/components/ui/button";
import { BlogType } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BlogCard } from "./_components/BlogCard";
import { FeaturedHero } from "./_components/FeaturedHero";
import { getBlogs } from "./actions/blogAction";

export default async function Home() {
  const allBlogs = await getBlogs();

  // Find a banner blog, or default to the first one if available
  const featuredBlog = allBlogs.find((blog) => blog.type === BlogType.BANNER) || allBlogs[0];

  // Recent blogs excluding the featured one
  const recentBlogs = allBlogs.filter((blog) => blog.id !== featuredBlog?.id).slice(0, 3);

  return (
    <div className="flex flex-col gap-16 py-8">
      <div className="container mx-auto px-4 md:px-6">
        {featuredBlog ? (
          <FeaturedHero blog={featuredBlog} />
        ) : (
          <div className="text-center py-20 bg-muted/20 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Welcome to BlogSpace</h2>
            <p>No blogs published yet. Be the first to write one!</p>
            <Link href="/dashboard/create-blog" className="mt-4 inline-block">
              <Button>Create Blog</Button>
            </Link>
          </div>
        )}
      </div>

      <section className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Recent Stories</h2>
          <Link href="/blogs">
            <Button variant="ghost" className="hidden sm:flex">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recentBlogs.length > 0 ? (
            recentBlogs.map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} />
            ))
          ) : (
            <p className="text-muted-foreground col-span-full text-center py-8">No recent stories found.</p>
          )}
        </div>
        <div className="mt-8 flex justify-center sm:hidden">
          <Link href="/blogs">
            <Button variant="outline" className="w-full">
              View All Stories
            </Button>
          </Link>
        </div>
      </section>

      <section className="bg-muted/30 py-16 container mx-auto">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to share your story?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join our community of writers and readers. Start your blog today and reach a global audience.
          </p>
          <Link href="/signup">
            <Button size="lg" className="rounded-full px-8">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
