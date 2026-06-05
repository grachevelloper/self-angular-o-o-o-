import { Component, computed, signal } from '@angular/core';
import { BookCardComponent } from './modules/books/components/book-card-component/book-card-component';
import { BookFiltersComponent } from './modules/books/components/book-filters-component/book-filters-component';
import { BOOKS_MOCK } from './modules/books/mocks';
import { Book, BookStatus } from './modules/books/model';
import { BookCreator, CreateBookDTO } from './modules/books/components/book-creator/book-creator';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [BookCardComponent, BookFiltersComponent, BookCreator]
})
export class App {
  protected readonly books = signal<Book[]>(BOOKS_MOCK);

  protected readonly searchQuery = signal('');

  protected readonly selectedStatus = signal<BookStatus | 'all'>('all');

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

  protected setStatus(newStatus: BookStatus): void {
    this.selectedStatus.update((currentStatus) =>
      currentStatus === newStatus ? 'all' : newStatus
    );
  }

  protected changeBookStatus(book: Book): void {
    const { id, status } = book;
    switch (status) {
      case 'finished':
        this.updateBookById(id, { status: 'wishlist' })
        return;
      case 'wishlist':
        this.updateBookById(id, { status: 'reading' })
        return;
      case 'reading':
        this.updateBookById(id, { status: 'finished' })
        return;
    }
  }

  protected updateBookById<K extends keyof Book>(
    bookId: number,
    updates: Pick<Book, K> | Partial<Book>
  ): void {
    this.books.update((list: Book[]) =>
      list.map(currentBook =>
        currentBook.id === bookId
          ? { ...currentBook, ...updates }
          : currentBook
      )
    )
    return;
  }

  protected readonly isCreateBookModalOpen = signal<boolean>(false);

  protected onChangeBookModal(): void {
    this.isCreateBookModalOpen.update((current) => !current)
    return;
  }

  protected onSubmitBookModal(newBook?: CreateBookDTO): void {
    this.addBook(newBook);
    this.onChangeBookModal();
    return;
  }


  private addBook(newBook?: CreateBookDTO): void {
    if(!newBook) return;

    const lastId = this.books().at(-1)?.id || 0
    this.books.update(books =>
      [...books, {...newBook, id: lastId + 1}])
  }

}
