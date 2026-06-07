import { Routes } from '@angular/router';
import { BookListPage } from './pages/book-list-page/book-list-page';
import { BookDetailsPage } from './pages/book-details-page/book-details-page';


export const BOOKS_ROUTES: Routes = [
    {
        path: '',
        component: BookListPage,
        title: "Мои книги"
    },
    {
        path: ':id',
        component: BookDetailsPage,
    }
]
