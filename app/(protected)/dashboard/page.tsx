import { deleteBlog, getBlogs } from "@/app/actions/blogAction";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/sign-in");
    }

    const { user } = session;
    const isAdmin = (user as any).role === "ADMIN";

    const myBlogs = await getBlogs({ authorId: user.id });
    const allBlogs = isAdmin ? await getBlogs() : [];

    const BlogList = ({ blogs }: { blogs: any[] }) => (
        <div className="space-y-4">
            {blogs.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No blogs found.</p>
            ) : (
                blogs.map((blog) => (
                    <div key={blog.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 last:border-0 last:pb-0 gap-4">
                        <div className="space-y-1">
                            <p className="font-medium leading-none">{blog.title}</p>
                            <p className="text-sm text-muted-foreground">
                                {new Date(blog.createdAt).toLocaleDateString()} • {blog.type} • {blog.category}
                                {isAdmin && blog.author?.name && <span className="ml-2 px-2 py-0.5 bg-muted rounded text-xs">by {blog.author.name}</span>}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link href={`/dashboard/edit-blog/${blog.slug}`}>
                                <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4 mr-1" /> Edit
                                </Button>
                            </Link>
                            <form action={async () => {
                                "use server"
                                await deleteBlog(blog.id)
                            }}>
                                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                                </Button>
                            </form>
                        </div>
                    </div>
                ))
            )}
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Manage your blogs and View performance.</p>
                </div>
                <Link href="/dashboard/create-blog">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Create New
                    </Button>
                </Link>
            </div>

            <div>
                {isAdmin ? (
                    <Tabs defaultValue="your-blogs" className="w-full">
                        <TabsList className="mb-4">
                            <TabsTrigger value="your-blogs">Your Blogs</TabsTrigger>
                            <TabsTrigger value="all-blogs">All Blogs</TabsTrigger>
                        </TabsList>
                        <TabsContent value="your-blogs">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Your Blogs</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <BlogList blogs={myBlogs} />
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="all-blogs">
                            <Card>
                                <CardHeader>
                                    <CardTitle>All Blogs (Admin)</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <BlogList blogs={allBlogs} />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Blogs</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <BlogList blogs={myBlogs} />
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}