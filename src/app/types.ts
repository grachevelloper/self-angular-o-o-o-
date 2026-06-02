export type BookStatus = 'reading' | 'finished' | 'wishlist';

export interface Book {
  id: number;
  title: string;
  author: string;
  status: BookStatus;
}
