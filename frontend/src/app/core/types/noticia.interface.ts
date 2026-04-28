export interface Poste {
    id: number;
    title: string;
    content: string;
    postType: string;
    publishedAt: string;
    createdAt: string;
    updatedAt?: string;
    image?: string;
    admin: {
        id: number;
        name: string;
    };
    local: string;
    imageUrls: string[];
}
