import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const ProjectsTableSkeleton = () => {
    const skeletonRows = Array.from({ length: 5 });
    return (
        <div className="space-y-6">
            <h1 className="text-xl md:text-3xl lg:text-3xl mb-5 font-bold text-center py-4 bg-muted-foreground/10 rounded-md">
                Welcome to Project Page.
            </h1>
            <div className="flex justify-between items-center">
                <Skeleton className="h-10 w-32 rounded-md" />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr>
                            <th className="px-2 min-w-14 py-3 text-left text-sm font-medium">
                                <Skeleton className="h-4 w-16" />
                            </th>
                            <th className="py-3 min-w-64 text-left text-sm font-medium">
                                <Skeleton className="h-4 w-24" />
                            </th>
                            <th className="py-3 min-w-24 text-left text-sm font-medium">
                                <Skeleton className="h-4 w-20" />
                            </th>
                            <th className="py-3 min-w-24 text-left text-sm font-medium">
                                <Skeleton className="h-4 w-20" />
                            </th>
                            <th className="py-3 min-w-24 text-left text-sm font-medium">
                                <Skeleton className="h-4 w-20" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {skeletonRows.map((_, idx) => (
                            <tr key={idx} className="border-b">
                                {/* Image */}
                                <td className="p-2 w-[60px]">
                                    <Skeleton className="h-10 w-10 rounded-md" />
                                </td>
                                {/* Title */}
                                <td>
                                    <Skeleton className="h-4 w-48" />
                                </td>
                                {/* Status */}
                                <td>
                                    <Skeleton className="h-4 w-20" />
                                </td>
                                {/* Date */}
                                <td>
                                    <Skeleton className="h-4 w-24" />
                                </td>
                                {/* Actions */}
                                <td className="w-[50px]">
                                    <Skeleton className="h-8 w-20" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProjectsTableSkeleton;