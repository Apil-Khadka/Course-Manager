export interface User {
    admin: any;
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

interface Course {
    id: number;
    title: string;
    description: string;
    assigned_to: Array<{ user_id: number }>;
    // Add other course properties as needed
}
interface PaginationLinks {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
    links: PaginationLinks;
}
interface CourseData {
    data: Course[];
    links: PaginationLinks;
    meta: PaginationMeta;
}
