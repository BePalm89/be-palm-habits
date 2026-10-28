import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddHabitForm } from './add-habit-form';
import { provideRouter } from '@angular/router';
import { HabitService } from '../service/habit';

describe('AddHabitForm', () => {
  let component: AddHabitForm;
  let fixture: ComponentFixture<AddHabitForm>;
  let habitService: HabitService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHabitForm],
      providers: [provideRouter([{ path: 'habits', children: [] }])],
    }).compileComponents();

    fixture = TestBed.createComponent(AddHabitForm);
    component = fixture.componentInstance;
    habitService = TestBed.inject(HabitService);

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it.each([
    ['', ['Name is required']],
    ['  ', ['Name cannot contain only spaces']],
    ['a', ['Name must be at least 2 characters']],
    [' a', ['Name must be at least 2 characters']],
    ['ab', []],
    [' CAT ', []],
    ['a'.repeat(41), ['Name must be at most 40 characters']],
  ])('should show errors for input %j: %j', async (input, expectedErrors) => {
    const element: HTMLElement = fixture.nativeElement;
    const nameInput = element.querySelector<HTMLInputElement>('#name')!;

    nameInput.value = input;
    nameInput.dispatchEvent(new Event('input'));
    nameInput.dispatchEvent(new Event('blur'));
    await fixture.whenStable();

    const errors = Array.from(element.querySelectorAll('#name-errors p')).map((p) =>
      p.textContent?.trim(),
    );

    expect(errors).toEqual(expectedErrors);
  });

  it('should show name is required and the lenght of habits should stay 3 when the submission is with an empty string', async () => {
    const element: HTMLElement = fixture.nativeElement;

    const saveButton = element.querySelector<HTMLButtonElement>('button[type="submit"]')!;

    saveButton.click();

    await fixture.whenStable();
    const errors = Array.from(element.querySelectorAll('#name-errors p')).map((p) =>
      p.textContent?.trim(),
    );

    expect(habitService.habits().length).toBe(3);
    expect(errors[0]).toEqual('Name is required');
  });

  it('should save correctly a new habits', async () => {
    const element: HTMLElement = fixture.nativeElement;
    const nameInput = element.querySelector<HTMLInputElement>('#name')!;

    nameInput.value = 'Catalano';
    nameInput.dispatchEvent(new Event('input'));
    nameInput.dispatchEvent(new Event('blur'));

    await fixture.whenStable();

    const categorySelect = element.querySelector<HTMLSelectElement>('#category')!;
    categorySelect.value = 'study';
    categorySelect.dispatchEvent(new Event('input'));
    categorySelect.dispatchEvent(new Event('blur'));

    await fixture.whenStable();

    const saveButton = element.querySelector<HTMLButtonElement>('button[type="submit"]')!;

    saveButton.click();

    expect(habitService.habits().length).toBe(4);
    expect(habitService.habits()[3].name).toBe('Catalano');
  });
});
