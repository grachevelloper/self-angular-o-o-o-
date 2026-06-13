import { Component, effect, input, output } from '@angular/core';
import { type Book, type BookStatus } from '../../model';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';


export interface CreateBookDTO extends Omit<Book, 'id'> { }
export interface UpdateBookDTO extends Partial<CreateBookDTO> { }

const VOID_STATE: CreateBookDTO = {
    title: '',
    author: '',
    status: 'wishlist'
}


@Component({
    selector: 'app-book-creator-component',
    templateUrl: './book-creator-component.html',
    styleUrl: './book-creator-component.scss',
    imports: [ReactiveFormsModule],
})
export class BookCreatorComponent {
    public readonly isOpen = input.required<boolean>();
    public readonly isSubmitting = input(false);
    public readonly close = output<void>();
    public readonly submitBook = output<CreateBookDTO>();

    protected bookForm = new FormGroup({
        title: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(300)
        ]),
        author: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(150)
        ]),
        status: new FormControl<BookStatus>('wishlist', [
            Validators.required,
        ])
    })

    private readonly resetClosedForm = effect(() => {
        if (!this.isOpen()) {
            this.bookForm.setValue(VOID_STATE);
        }
    });

    get title() { return this.bookForm.get('title'); }
    get author() { return this.bookForm.get('author'); }
    get status() { return this.bookForm.get('status'); }

    public onSubmit(): void {
        const form = this.bookForm;
        if (this.isSubmitting()) {
            return;
        }

        if (form.valid) {
            const formData = form.getRawValue() as CreateBookDTO;
            this.submitBook.emit(formData)
        } else {
            this.bookForm.markAllAsTouched();
        }
    }

    protected onClose() {
        if (this.isSubmitting()) {
            return;
        }

        this.close.emit();
        this.bookForm.setValue(VOID_STATE);
    }

}
