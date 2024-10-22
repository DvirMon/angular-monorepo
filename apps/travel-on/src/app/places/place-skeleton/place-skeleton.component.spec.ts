import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaceSkeletonComponent } from './place-skeleton.component';

describe('PlaceSkeletonComponent', () => {
  let component: PlaceSkeletonComponent;
  let fixture: ComponentFixture<PlaceSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceSkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaceSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
