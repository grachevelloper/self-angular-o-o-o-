import { Component, computed, signal } from '@angular/core';
import { BOOKS_MOCK } from './mocks';
import { Book, BookStatus } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly books = signal<Book[]>(BOOKS_MOCK);

  protected readonly selectedStatus = signal<BookStatus | 'all'>('all');

  protected readonly searchQuery = signal('');

  protected readonly filteredBooks = computed(() => {
    let filteredBooks = this.books();

    const query = this.searchQuery().trim().toLowerCase();

    const status = this.selectedStatus()

    if (query) {
      filteredBooks = filteredBooks.filter((book: Book) => {
        return book.author.toLowerCase().includes(query) ||
          book.title.toLowerCase().includes(query)
      });
    }

    if (status === 'all') {
      return filteredBooks;
    }

    return filteredBooks.filter((book: Book) => book.status === status);

  });

  protected setStatus(newStatus: BookStatus) {
    this.selectedStatus.update((currentStatus) =>
      currentStatus === newStatus ? 'all' : newStatus
    );
  }
}
