import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const BlogsTableSkeleton = () => {
    const skeletonRows = Array.from({ length: 5 });

    return (
        <div className="space-y-6">
            <h1 className="text-xl md:text-3xl lg:text-3xl mb-5 font-bold text-center py-4 bg-muted-foreground/10 rounded-md">
                Welcome to Blogs Page.
            </h1>
            <div className="flex justify-between items-center">
                <Skeleton className="h-10 w-32 rounded-md" />
            </div>

            {/* Table */}
            <table className="min-w-full table-auto border-collapse shadow-md rounded-lg overflow-hidden">
                <thead>
                    <tr>
                        <th className="px-2 py-3 text-left text-sm font-medium">
                            <Skeleton className="h-4 w-16" />
                        </th>
                        <th className="py-3 text-left text-sm font-medium">
                            <Skeleton className="h-4 w-24" />
                        </th>
                        <th className="py-3 text-left text-sm font-medium">
                            <Skeleton className="h-4 w-20" />
                        </th>
                        <th className="py-3 text-left text-sm font-medium">
                            <Skeleton className="h-4 w-20" />
                        </th>
                        <th className="py-3 text-left text-sm font-medium">
                            <Skeleton className="h-4 w-16" />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {skeletonRows.map((_, idx) => (
                        <tr key={idx} className="border-b">
                            <td className="p-2">
                                <Skeleton className="h-10 w-10 rounded-md" />
                            </td>
                            <td>
                                <Skeleton className="h-4 w-32 mb-2" />
                            </td>
                            <td>
                                <Skeleton className="h-4 w-20" />
                            </td>
                            <td>
                                <Skeleton className="h-4 w-20" />
                            </td>
                            <td className="max-w-[50px]">
                                <Skeleton className="h-10 w-24" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BlogsTableSkeleton;