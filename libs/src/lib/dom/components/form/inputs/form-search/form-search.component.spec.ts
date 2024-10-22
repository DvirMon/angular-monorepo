import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSearchComponent } from './form-search.component';
import { FormControl } from '@angular/forms';
import { ComponentRef } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('FormSearchComponent', () => {
  let component: FormSearchComponent;
  let componentRef : ComponentRef<FormSearchComponent>
  let fixture: ComponentFixture<FormSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormSearchComponent],
      providers : [provideAnimations()]
    });
    fixture = TestBed.createComponent(FormSearchComponent);
    component = fixture.componentInstance;


    componentRef = fixture.componentRef;


    componentRef.setInput('control', new FormControl());

    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
