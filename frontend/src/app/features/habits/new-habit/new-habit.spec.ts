import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewHabit } from './new-habit';
import { provideRouter } from '@angular/router';

describe('NewHabit', () => {
  let component: NewHabit;
  let fixture: ComponentFixture<NewHabit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewHabit],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NewHabit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays a link with close icon to return to the today page', () => {
    const el = fixture.nativeElement as HTMLElement;

    const closeHabitLink = el.querySelector('[aria-label="Close"]');

    expect(closeHabitLink?.getAttribute('href')).toBe('/');
  });

  it('displays a heading with text new habit', () => {
    const el = fixture.nativeElement as HTMLElement;

    const heading = el.querySelector('h1');

    expect(heading?.textContent).toBe('New habit');
  });

  it('displays a label with text name', () => {
    const el = fixture.nativeElement as HTMLElement;

    const label = el.querySelector('label');

    expect(label).not.toBeNull();
    expect(label?.textContent).toContain('Name');
  });
});
