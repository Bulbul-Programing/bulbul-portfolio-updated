import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const AllBlogLoadingSkeleton = () => {
    return (
        <section className="w-full">
            {/* Header Skeleton */}
            <div className="py-8 md:py-14 text-center">
                <Skeleton className="h-10 w-48 mx-auto mb-2 rounded-md" /> {/* Title */}
                <Skeleton className="h-4 w-36 mx-auto rounded-md" /> {/* Breadcrumb */}
            </div>

            {/* Main Content Skeleton */}
            <div className="container mx-auto p-5 md:p-10 lg:py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left Section */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Cover Image */}
                    <Skeleton className="w-full h-60 md:h-80 rounded-xl" />

                    {/* Blog Title */}
                    <Skeleton className="h-8 w-3/4 rounded-md" />

                    {/* Blog Content */}
                    <Skeleton className="h-4 w-full rounded-md" />
                    <Skeleton className="h-4 w-full rounded-md" />
                    <Skeleton className="h-4 w-5/6 rounded-md" />
                    <Skeleton className="h-4 w-2/3 rounded-md" />
                    <Skeleton className="h-4 w-4/5 rounded-md" />
                </div>

                {/* Right Sidebar */}
                <aside className="bg-card shadow-sm rounded-xl border p-6 space-y-4">
                    <Skeleton className="h-6 w-3/4 rounded-md" /> {/* Info Card Title */}
                    <Skeleton className="h-4 w-full rounded-md" />
                    <Skeleton className="h-4 w-3/4 rounded-md" />
                    <Skeleton className="h-4 w-2/3 rounded-md" />

                    {/* Optional Links */}
                    <div className="flex flex-col gap-4 mt-6">
                        <Skeleton className="h-6 w-32 rounded-md" />
                        <Skeleton className="h-6 w-32 rounded-md" />
                    </div>
                </aside>
            </div>
        </section>

    );
};

export default AllBlogLoadingSkeleton;