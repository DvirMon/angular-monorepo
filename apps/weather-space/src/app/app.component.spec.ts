import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { LayoutComponent } from './ui/layout/layout.component';


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [AppComponent, LayoutComponent, RouterOutlet],
        providers: [
            {provide : ActivatedRoute, useValue : {}},
            provideAnimations(),
            provideHttpClient(),
            provideHttpClientTesting(),
          ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger change detection
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy(); // Check that the component is created
  });

  it('should render the layout component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('weather-space-layout')).not.toBeNull(); // Check if LayoutComponent is rendered
  });

  it('should contain a router outlet', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('router-outlet')).not.toBeNull(); // Check if RouterOutlet is present
  });
});
