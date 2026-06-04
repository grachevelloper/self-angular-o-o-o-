import { Component, input, output } from '@angular/core';
import { Book, BookStatus } from '../../model';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card-component.html',
  styleUrl: './book-card-component.scss',
})
export class BookCardComponent {
  public readonly book = input.required<Book>();

  public statusClicked = output<Book>();
}
