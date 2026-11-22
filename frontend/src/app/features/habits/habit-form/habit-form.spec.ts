import { ComponentFixture, TestBed } from '@angular/core/testing';
import { inputBinding, outputBinding, signal } from '@angular/core';
import { HabitForm } from './habit-form';
import { Habit } from '../habit.model';

describe('HabitForm', () => {
  let component: HabitForm;
  let fixture: ComponentFixture<HabitForm>;
  let emittedHabit: Pick<Habit, 'name' | 'category'> | undefined;

  beforeEach(async () => {
    emittedHabit = undefined;

    // 1. niente provideRouter né HabitService: il form non li usa più
    await TestBed.configureTestingModule({
      imports: [HabitForm],
    }).compileComponents();

    fixture = TestBed.createComponent(HabitForm, {
      bindings: [
        inputBinding('nameButton', signal('Save habit')),
        outputBinding('save', (value: Pick<Habit, 'name' | 'category'>) => {
          emittedHabit = value;
        }),
      ],
    });
    component = fixture.componentInstance;

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

  // 2. il nome dice cosa verifichiamo davvero ora: niente emit + errore visibile
  it('should not emit and should show "Name is required" when submitting an empty form', async () => {
    const element: HTMLElement = fixture.nativeElement;

    element.querySelector<HTMLButtonElement>('button[type="submit"]')!.click();
    await fixture.whenStable();

    const errors = Array.from(element.querySelectorAll('#name-errors p')).map((p) =>
      p.textContent?.trim(),
    );

    // 3. al posto di habits().length: il form non deve aver emesso niente
    expect(emittedHabit).toBeUndefined();
    expect(errors[0]).toBe('Name is required');
  });

  it('should emit name and category when submitting a valid form', async () => {
    const element: HTMLElement = fixture.nativeElement;

    const nameInput = element.querySelector<HTMLInputElement>('#name')!;
    const categorySelect = element.querySelector<HTMLSelectElement>('#category')!;

    nameInput.value = 'Coding kata';
    nameInput.dispatchEvent(new Event('input'));

    categorySelect.value = 'study';
    categorySelect.dispatchEvent(new Event('input'));

    await fixture.whenStable();

    element.querySelector<HTMLButtonElement>('button[type="submit"]')!.click();
    await fixture.whenStable();

    expect(emittedHabit).toEqual({ name: 'Coding kata', category: 'study' });
  });
});
