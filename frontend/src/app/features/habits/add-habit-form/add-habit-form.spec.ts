import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddHabitForm } from './add-habit-form';
import { provideRouter } from '@angular/router';

describe('AddHabitForm', () => {
  let component: AddHabitForm;
  let fixture: ComponentFixture<AddHabitForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHabitForm],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AddHabitForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it.each([
    ['', ['required']],
    ['  ', ['blank']],
    ['a', ['minLength']],
    [' a', ['minLength']],
    ['ab', []],
    [' CAT ', []],
    ['a'.repeat(41), ['maxLength']],
  ])('should show errors for input %j: %j', async (input, expectedErrors) => {
    const element: HTMLElement = fixture.nativeElement;
    const nameInput = element.querySelector<HTMLInputElement>('#name')!;

    nameInput.value = input;
    nameInput.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    const errors = Array.from(element.querySelectorAll('p')).map((p) => p.textContent?.trim());

    expect(errors).toEqual(expectedErrors);
  });
});
