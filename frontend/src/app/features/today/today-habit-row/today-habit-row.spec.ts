import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodayHabitRow } from './today-habit-row';
import { inputBinding, outputBinding, WritableSignal, signal } from '@angular/core';
import { Category, Habit } from '../../habits/habit.model';

describe('TodayHabitRow', () => {
  let component: TodayHabitRow;
  let fixture: ComponentFixture<TodayHabitRow>;
  let habit: WritableSignal<Partial<Habit>>;
  let isDone: WritableSignal<boolean>;
  let toggledIds: string[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodayHabitRow],
    }).compileComponents();

    habit = signal({ id: 'id1', name: 'Catalan', category: 'study' });
    isDone = signal(false);
    toggledIds = [];

    fixture = TestBed.createComponent(TodayHabitRow, {
      bindings: [
        inputBinding('habit', habit),
        inputBinding('isDone', isDone),
        outputBinding<string>('toggle', (id) => toggledIds.push(id)),
      ],
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  const button = () => (fixture.nativeElement as HTMLElement).querySelector('button')!;

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it.each([
    {
      name: 'catalan',
      testHabit: { id: '1', name: 'Catalan', category: 'study' as Category },
      expected: 'Catalan',
    },
    {
      name: 'drinking water',
      testHabit: { id: '2', name: 'Drinking water', category: 'health' as Category },
      expected: 'Drinking water',
    },
  ])('displays $expected when the habit is $name', async ({ testHabit, expected }) => {
    habit.set(testHabit);

    await fixture.whenStable();

    expect(button().textContent.trim()).toContain(expected);
  });

  it.each([
    { isDoneValue: false, pressed: 'false', filledCircles: 0 },
    { isDoneValue: true, pressed: 'true', filledCircles: 1 },
  ])(
    'shows aria-pressed="$pressed" and $filledCircles filled circle when isDone is $isDoneValue',
    async ({ isDoneValue, pressed, filledCircles }) => {
      isDone.set(isDoneValue);

      await fixture.whenStable();

      expect(button().getAttribute('aria-pressed')).toBe(pressed);
      expect(button().querySelectorAll('.check.done').length).toBe(filledCircles);
    },
  );

  it('emits the habit id once when the card is clicked', () => {
    button().click();

    expect(toggledIds).toEqual(['id1']);
  });

  it('hides the category avatar from screen readers so the button is named after the habit', () => {
    const avatar = button().querySelector('app-avatar-category');

    expect(avatar?.getAttribute('aria-hidden')).toBe('true');
  });
});
