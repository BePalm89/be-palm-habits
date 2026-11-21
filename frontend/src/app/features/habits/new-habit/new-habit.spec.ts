import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewHabit } from './new-habit';
import { provideRouter } from '@angular/router';
import { HabitService } from '../service/habit';

describe('NewHabit', () => {
  let component: NewHabit;
  let fixture: ComponentFixture<NewHabit>;
  let habitService: HabitService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewHabit],
      providers: [provideRouter([{ path: 'habits', children: [] }])],
    }).compileComponents();

    fixture = TestBed.createComponent(NewHabit);
    component = fixture.componentInstance;
    habitService = TestBed.inject(HabitService);

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

  it('saves correctly a new habit', async () => {
    const el = fixture.nativeElement as HTMLElement;

    const nameInput = el.querySelector<HTMLInputElement>('#name')!;

    nameInput.value = 'Catalano';
    nameInput.dispatchEvent(new Event('input'));
    nameInput.dispatchEvent(new Event('blur'));

    await fixture.whenStable();

    const categorySelect = el.querySelector<HTMLSelectElement>('#category')!;
    categorySelect.value = 'study';
    categorySelect.dispatchEvent(new Event('input'));
    categorySelect.dispatchEvent(new Event('blur'));

    await fixture.whenStable();

    const saveButton = el.querySelector<HTMLButtonElement>('button[type="submit"]')!;

    saveButton.click();

    expect(habitService.habits().length).toBe(4);
    expect(habitService.habits()[3].name).toBe('Catalano');
  });
});
