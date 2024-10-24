import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersPageComponent } from './filters.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';

describe('FiltersPageComponent', () => {
  let component: FiltersPageComponent;
  let fixture: ComponentFixture<FiltersPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FiltersPageComponent],
      providers: [
        {provide : ActivatedRoute, useValue : {}},
        provideAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    fixture = TestBed.createComponent(FiltersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
