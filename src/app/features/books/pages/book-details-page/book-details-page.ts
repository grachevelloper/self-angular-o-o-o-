import { Component, computed, effect, inject, signal } from '@angular/core';
import { Book } from '../../model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
    selector: 'app-book-details-page',
    imports: [],
    templateUrl: './book-details-page.html',
    styleUrl: './book-details-page.scss',
})
export class BookDetailsPage {

    constructor() {
        effect(() => {
            const book = this.book();
            if (book) {
                this.titleService.setTitle(`${book.title} | Мои книги`);
                return;
            }
            this.titleService.setTitle('Книга не найдена | Мои книги');
        });
    }

    private router = inject(Router);
    private bookService = inject(BookService);
    private route = inject(ActivatedRoute);
    private titleService = inject(Title);

    private readonly routeId = toSignal(
        this.route.paramMap.pipe(
            map((params) => {
                const id = Number(params.get('id'));
                return Number.isNaN(id) ? null : id;
            })
        ),
        { initialValue: null }
    );

    protected readonly book = computed(() => {
        const id = this.routeId();
        if (id === null) {
            return undefined;
        }
        return this.bookService.getBookById(id);
    });

    protected handleBackClick() {
        this.router.navigate(['..'], { relativeTo: this.route });
    }
}
