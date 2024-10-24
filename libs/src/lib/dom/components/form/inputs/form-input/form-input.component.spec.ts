import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputComponent } from './form-input.component';
import { ComponentRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('FormInputComponent', () => {
  let component: FormInputComponent;
  let componentRef : ComponentRef<FormInputComponent>
  let fixture: ComponentFixture<FormInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormInputComponent],
      providers : [provideAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInputComponent);
    component = fixture.componentInstance;

    componentRef = fixture.componentRef;


    componentRef.setInput('control', new FormControl());
    componentRef.setInput('name', 'input');


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
