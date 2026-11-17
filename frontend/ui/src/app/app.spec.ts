import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AppComponent } from './app';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render projects returned by the backend', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const httpTesting = TestBed.inject(HttpTestingController);
    httpTesting.expectOne('http://localhost:3000/api/projects').flush([
      {
        _id: 'project-1',
        title: 'API-backed project',
        description: 'Loaded from the backend',
        technologies: ['Angular'],
      },
    ]);
    httpTesting.expectOne('http://localhost:3000/api/skills').flush([]);
    httpTesting.expectOne('http://localhost:3000/api/education').flush([]);
    httpTesting.expectOne('http://localhost:3000/api/internships').flush([]);
    httpTesting.expectOne('http://localhost:3000/api/certifications').flush([]);

    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(fixture.componentInstance.projects()).toHaveLength(1);
    expect(compiled.textContent).toContain('API-backed project');
    httpTesting.verify();
  });
});
