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
    author?: string;
}

interface BlogDetailsProps {
    blog: Blog;
}

const BlogDetails = ({ blog }: BlogDetailsProps) => {
    return (
        <section className="w-full" >
            {/* ✅ Breadcrumb */}
            < div className="bg-muted py-8 md:py-14 text-center" >
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                    Blog Details
                </h1>
                <p className="text-sm text-muted-foreground mt-2">
                    <Link href="/" className="hover:text-primary">Home</Link> /
                    <span className="text-primary ml-1">{blog.title}</span>
                </p>
            </div >

            {/* ✅ Main Content */}
            < div className="container mx-auto p-5 md:p-10 lg:py-10 grid grid-cols-1 lg:grid-cols-3 gap-10" >

                {/* ✅ Left Section (Content) */}
                < div className="lg:col-span-2" >
                    <div className="relative w-full h-60 md:h-80 rounded-xl overflow-hidden border">
                        <Image
                            src={blog.coverImage}
                            alt={blog.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <h2 className="text-2xl font-bold mt-6 text-foreground">
                        {blog.title}
                    </h2>

                    <div
                        className="text-muted-foreground leading-relaxed mt-4"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </div >

                {/* ✅ Right Sidebar Info Card */}
                < aside className="bg-card shadow-sm rounded-xl border p-6 h-fit" >
                    <h3 className="text-lg font-semibold text-foreground border-b pb-3 mb-4">
                        Blog Information
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-3">
                        <li><strong className="text-foreground">Title:</strong> {blog.title}</li>
                        <li><strong className="text-foreground">Published:</strong> {new Date(blog.createdAt).toDateString()}</li>
                        {blog.author && <li><strong className="text-foreground">Author:</strong> {blog.author}</li>}
                    </ul>

                    <div className="flex flex-col gap-4 mt-6">
                        {/* Optional: External links if blog has references */}
                        {/* Example */}
                        {/* <a
              href="#"
              target="_blank"
              className="flex items-center gap-2 text-primary text-sm hover:underline"
            >
              <ExternalLink size={18} /> Read on Source
            </a> */}
                    </div>
                </aside >
            </div >
        </section >
    );
};

export default BlogDetails;