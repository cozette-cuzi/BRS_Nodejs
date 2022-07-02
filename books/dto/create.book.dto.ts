export interface CreateBookDto {
  title: string;
  authors: string;
  releasedAt: Date;
  description?: string;
  coverImage?: string;
  pages: number;
  languageCode: string;
  isbn: string;
  inStock: number;
}
