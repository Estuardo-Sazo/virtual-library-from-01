export interface Book {
    _id: string;
    title?: string;
    description?: string;
    images: string[];
    userId?: UserId;
    createdAt?: string;
}

export interface UserId {
    _id: string;
    username: string;
}

