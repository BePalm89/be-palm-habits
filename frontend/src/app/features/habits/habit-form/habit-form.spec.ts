import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HabitForm } from './habit-form';
import { provideRouter } from '@angular/router';
import { HabitService } from '../service/habit';
import { inputBinding, outputBinding, signal } from '@angular/core';

describe('HabitForm', () => {
  let component: HabitForm;
  let fixture: ComponentFixture<HabitForm>;
  let habitService: HabitService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitForm],
      providers: [provideRouter([{ path: 'habits', children: [] }])],
    }).compileComponents();

    fixture = TestBed.createComponent(HabitForm, {
      bindings: [
        inputBinding('nameButton', signal('Save habit')),
        outputBinding('save', { name: 'Catalan', category: 'study' }),
      ],
    });
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

  it('should show name is required and the length of habits should stay 3 when the submission is with an empty string', async () => {
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

  it('should emit an habit when clicking on the submission button', async () => {});
});
