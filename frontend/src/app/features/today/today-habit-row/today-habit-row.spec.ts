import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodayHabitRow } from './today-habit-row';
import { inputBinding, WritableSignal, signal } from '@angular/core';
import { Category, Habit } from '../../habits/habit.model';

describe('TodayHabitRow', () => {
  let component: TodayHabitRow;
  let fixture: ComponentFixture<TodayHabitRow>;
  let habit: WritableSignal<Partial<Habit>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodayHabitRow],
    }).compileComponents();

    habit = signal({ id: 'id1', name: 'Catalan', category: 'study' });

    fixture = TestBed.createComponent(TodayHabitRow, {
      bindings: [inputBinding('habit', habit)],
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

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
  ])('displays $expected when the habitis %name', ({ testHabit, expected }) => {
    habit.set(testHabit);

    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const avatar = el.querySelector('app-avatar-category');

    expect(el.textContent.trim()).toContain(expected);
    expect(avatar?.getAttribute('aria-hidden')).toBe('true');
  });
});
