import Image from "next/image";
import Link from "next/link";

interface Blog {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    coverImage: string;
    published: boolean;
    createdAt: string;
}

const BlogsSection = ({ blogs }: { blogs: Blog[] }) => {
    return (
        <section className="py-10 md:py-16">
            {/* Header */}
            <div className="bg-muted py-8 md:py-14 text-center mb-5 md:mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                    Blogs
                </h1>
                <p className="text-sm text-muted-foreground mt-2">
                    <Link href="/" className="hover:text-primary">Home</Link> /
                    <span className="text-primary ml-1">Blogs</span>
                </p>
            </div>

            {/* Blog Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 px-5 md:px-10 lg:px-12">
                {blogs.map((blog) => (
                    <div
                        key={blog.id}
                        className="border hover:border-primary bg-card text-card-foreground rounded-2xl shadow-lg overflow-hidden border-border hover:shadow-xl transition"
                    >
                        {/* Cover Image */}
                        <Image
                            src={blog.coverImage}
                            alt={blog.title}
                            width={500}
                            height={200}
                            className="w-full h-48 object-cover"
                        />

                        <Link href={`/blog/details/${blog.slug}`}>
                            <div className="p-6 space-y-4">
                                {/* Title */}
                                {/* <h3 className="hidden lg:block text-xl font-bold tracking-tight">
                                    {blog.title.length > 34
                                        ? `${blog.title.slice(0, 34)}...`
                                        : blog.title}
                                </h3> */}
                                <h3 className=" text-xl font-bold tracking-tight">
                                    {blog.title.length > 28
                                        ? `${blog.title.slice(0, 28)}...`
                                        : blog.title}
                                </h3>

                                {/* Excerpt / Short content */}
                                <p
                                    className="text-muted-foreground text-sm line-clamp-3 hidden lg:block"
                                    dangerouslySetInnerHTML={{
                                        __html: blog.excerpt
                                            ? blog.excerpt.length > 93
                                                ? `${blog.excerpt.slice(0, 93)}...`
                                                : blog.excerpt
                                            : blog.content.slice(0, 93) + "...",
                                    }}
                                />
                                <p
                                    className="text-muted-foreground text-sm line-clamp-3 block lg:hidden"
                                    dangerouslySetInnerHTML={{
                                        __html: blog.excerpt
                                            ? blog.excerpt.length > 75
                                                ? `${blog.excerpt.slice(0, 75)}...`
                                                : blog.excerpt
                                            : blog.content.slice(0, 75) + "...",
                                    }}
                                />

                                {/* Created Date */}
                                <p className="text-xs text-muted-foreground">
                                    Published: {new Date(blog.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BlogsSection;