import { ComponentFixture, TestBed } from '@angular/core/testing';
import { inputBinding, outputBinding, signal } from '@angular/core';
import { HabitForm } from './habit-form';
import { HabitDraft } from '../habit.model';

describe('HabitForm', () => {
  let component: HabitForm;
  let fixture: ComponentFixture<HabitForm>;
  let emittedHabit: HabitDraft | undefined;

  beforeEach(async () => {
    emittedHabit = undefined;

    await TestBed.configureTestingModule({
      imports: [HabitForm],
    }).compileComponents();

    fixture = TestBed.createComponent(HabitForm, {
      bindings: [
        inputBinding('nameButton', signal('Save habit')),
        outputBinding('save', (value: HabitDraft) => {
          emittedHabit = value;
        }),
      ],
    });
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  async function fillValidNameAndCategory(element: HTMLElement) {
    const nameInput = element.querySelector<HTMLInputElement>('#name')!;
    const categorySelect = element.querySelector<HTMLSelectElement>('#category')!;

    nameInput.value = 'Coding kata';
    nameInput.dispatchEvent(new Event('input'));

    categorySelect.value = 'study';
    categorySelect.dispatchEvent(new Event('input'));

    await fixture.whenStable();
  }

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

  it('should not emit and should show "Name is required" when submitting an empty form', async () => {
    const element: HTMLElement = fixture.nativeElement;

    element.querySelector<HTMLButtonElement>('button[type="submit"]')!.click();
    await fixture.whenStable();

    const errors = Array.from(element.querySelectorAll('#name-errors p')).map((p) =>
      p.textContent?.trim(),
    );

    expect(emittedHabit).toBeUndefined();
    expect(errors[0]).toBe('Name is required');
  });

  it('should emit name, category, every day and a reminder null when submitting a valid form', async () => {
    const element: HTMLElement = fixture.nativeElement;

    await fillValidNameAndCategory(element);

    element.querySelector<HTMLButtonElement>('button[type="submit"]')!.click();
    await fixture.whenStable();

    expect(emittedHabit).toEqual({
      name: 'Coding kata',
      category: 'study',
      scheduledDays: [0, 1, 2, 3, 4, 5, 6],
      reminder: null,
    });
  });

  it('should emit name, category, every day and a reminder when submitting a valid form', async () => {
    const element: HTMLElement = fixture.nativeElement;

    await fillValidNameAndCategory(element);

    const reminderInput = element.querySelector<HTMLInputElement>('#reminder')!;

    reminderInput.value = '07:30';
    reminderInput.dispatchEvent(new Event('input'));

    await fixture.whenStable();

    element.querySelector<HTMLButtonElement>('button[type="submit"]')!.click();
    await fixture.whenStable();

    expect(emittedHabit).toEqual({
      name: 'Coding kata',
      category: 'study',
      scheduledDays: [0, 1, 2, 3, 4, 5, 6],
      reminder: '07:30',
    });
  });

  it('should emit selected days when submitting chosen days', async () => {
    const element: HTMLElement = fixture.nativeElement;

    await fillValidNameAndCategory(element);

    const chosenDaysRadio = element.querySelector<HTMLInputElement>(
      'input[type="radio"][value="chosen-days"]',
    )!;

    chosenDaysRadio.click();
    await fixture.whenStable();

    const checkboxes = element.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');

    for (const index of [0, 2, 4]) {
      checkboxes[index].click();
    }

    await fixture.whenStable();

    element.querySelector<HTMLButtonElement>('button[type="submit"]')!.click();
    await fixture.whenStable();

    expect(emittedHabit).toEqual({
      name: 'Coding kata',
      category: 'study',
      scheduledDays: [0, 2, 4],
      reminder: null,
    });
  });

  it('should not emit and should show an error when submitting chosen days without selecting any day', async () => {
    const element: HTMLElement = fixture.nativeElement;

    await fillValidNameAndCategory(element);

    const chosenDaysRadio = element.querySelector<HTMLInputElement>(
      'input[type="radio"][value="chosen-days"]',
    )!;

    chosenDaysRadio.click();
    await fixture.whenStable();

    element.querySelector<HTMLButtonElement>('button[type="submit"]')!.click();
    await fixture.whenStable();

    expect(emittedHabit).toBeUndefined();

    const errors = Array.from(element.querySelectorAll('#days-errors p')).map((p) =>
      p.textContent?.trim(),
    );

    expect(errors).toContain('Choose at least one day');
  });

  it('should give each day checkbox its full day name', async () => {
    const element: HTMLElement = fixture.nativeElement;

    element.querySelector<HTMLInputElement>('input[type="radio"][value="chosen-days"]')!.click();
    await fixture.whenStable();

    const labels = Array.from(
      element.querySelectorAll<HTMLInputElement>('input[type="checkbox"]'),
    ).map((checkbox) => checkbox.getAttribute('aria-label'));

    expect(labels).toEqual([
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ]);
  });
});
