export type TProject = {
    id: number;
    title: string;
    slug?: string;
    description: string;
    thumbnail: string;
    liveUrl: string;
    repoUrl: string;
    isPublished: boolean;
    features: string[];
    ownerId: number;
    createdAt: Date;
    updatedAt: Date;
};
