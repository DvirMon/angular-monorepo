import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCardComponent } from './book-card.component';
import { ComponentRef } from '@angular/core';
import { Book } from '../books';

describe('BookCardComponent', () => {
  let component: BookCardComponent;
  let componentRef: ComponentRef<BookCardComponent>;
  let fixture: ComponentFixture<BookCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BookCardComponent],
    });
    fixture = TestBed.createComponent(BookCardComponent);
    component = fixture.componentInstance;

    componentRef = fixture.componentRef;

    componentRef.setInput('book', {
      authors: ['test'],
      description: 'test',
      imageLinks: { thumbnail: 'test' },
      title: 'test',
      id: 'test',
    } as Book);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
