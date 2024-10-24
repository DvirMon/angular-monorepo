import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookshelfPageComponent } from './shelf.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';

describe('BookshelfPageComponent', () => {
  let component: BookshelfPageComponent;
  let fixture: ComponentFixture<BookshelfPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BookshelfPageComponent],
      providers: [
        {provide : ActivatedRoute, useValue : {}},

        provideAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    fixture = TestBed.createComponent(BookshelfPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
