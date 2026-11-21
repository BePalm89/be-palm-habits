import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditHabit } from './edit-habit';
import { provideRouter } from '@angular/router';
import { inputBinding, signal } from '@angular/core';
import { HabitService } from '../service/habit';

describe('EditHabit', () => {
  let component: EditHabit;
  let fixture: ComponentFixture<EditHabit>;
  let habitService: HabitService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditHabit],
      providers: [provideRouter([{ path: 'habits', children: [] }])],
    }).compileComponents();

    fixture = TestBed.createComponent(EditHabit, {
      bindings: [inputBinding('id', signal('id1'))],
    });
    component = fixture.componentInstance;
    habitService = TestBed.inject(HabitService);

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays a link with close icon to return to the habits page', () => {
    const el = fixture.nativeElement as HTMLElement;

    const closeHabitLink = el.querySelector('[aria-label="Close"]');

    expect(closeHabitLink?.getAttribute('href')).toBe('/habits');
  });

  it('displays a heading with text edit habit', () => {
    const el = fixture.nativeElement as HTMLElement;

    const heading = el.querySelector('h1');

    expect(heading?.textContent).toBe('Edit habit');
  });

  it('updates an existing habit without creating a new one', async () => {
    const el = fixture.nativeElement as HTMLElement;

    const nameInput = el.querySelector<HTMLInputElement>('#name')!;
    const categorySelect = el.querySelector<HTMLSelectElement>('#category')!;

    expect(nameInput.value).toBe('coding training');
    expect(categorySelect.value).toBe('study');

    nameInput.value = 'coding kata';
    nameInput.dispatchEvent(new Event('input'));

    categorySelect.value = 'reading';
    categorySelect.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    const saveButton = el.querySelector<HTMLButtonElement>('button[type="submit"]')!;

    saveButton.click();

    await fixture.whenStable();

    expect(habitService.habits().length).toBe(3);

    const updatedHabit = habitService.habits().find((h) => h.id === 'id1');

    expect(updatedHabit?.name).toBe('coding kata');
    expect(updatedHabit?.category).toBe('reading');
  });
});
