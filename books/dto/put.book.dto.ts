export interface PutBookDto {
    title: string;
    authors: string;
    releasedAt: Date;
    description: string;
    coverImage: Object;
    pages: number;
    languageCode: string;
    isbn: string;
    inStock: number;
}
