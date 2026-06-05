import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCreator } from './book-creator';

describe('BookCreator', () => {
  let component: BookCreator;
  let fixture: ComponentFixture<BookCreator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCreator],
    }).compileComponents();

    fixture = TestBed.createComponent(BookCreator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
