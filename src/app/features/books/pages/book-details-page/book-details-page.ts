import { Component, effect, inject, signal } from '@angular/core';
import { Book } from '../../model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services';

@Component({
    selector: 'app-book-details-page',
    imports: [],
    templateUrl: './book-details-page.html',
    styleUrl: './book-details-page.scss',
})
export class BookDetailsPage {
    private router = inject(Router)
    private route = inject(ActivatedRoute);
    private bookService = inject(BookService);
    private titleService = inject(Title);

    protected book = signal<Book | undefined>(undefined);

    constructor() {
        const id = Number(this.route.snapshot.params['id']);
        this.book.set(this.bookService.getBookById(id));

        effect(() => {
            const currentBook = this.book();
            if (currentBook) {
                this.titleService.setTitle(`${currentBook.title} | Книжный магазин`);
            }
        });
    }

    protected handleBackClick() {
        this.router.navigate(['..'], { relativeTo: this.route });
    }

}
