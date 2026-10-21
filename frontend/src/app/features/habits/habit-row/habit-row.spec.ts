import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HabitRow } from './habit-row';
import { inputBinding, signal } from '@angular/core';
import { Habit } from '../habit.model';

const habit: Habit = {
  id: 'id',
  name: 'test habit',
  category: 'cats',
  reminder: '07:30',
  scheduledDays: [0, 2, 4],
};

describe('HabitRow', () => {
  let component: HabitRow;
  let fixture: ComponentFixture<HabitRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitRow],
    }).compileComponents();

    fixture = TestBed.createComponent(HabitRow, {
      bindings: [inputBinding('habit', signal(habit))],
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the name and the category for the habit', () => {
    const el = fixture.nativeElement as HTMLElement;

    expect(el.textContent).toContain(habit.name);
    expect(el.textContent).toContain(habit.category);
  });
});
