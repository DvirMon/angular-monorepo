import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { LoginPageComponent } from './login.component';

import { ActivatedRoute } from '@angular/router';
import { provideFirebase } from '../../shared/providers/firebase';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoginPageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            useValue: {},
          },
        },
        provideAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideFirebase(),
      ],
    });
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
