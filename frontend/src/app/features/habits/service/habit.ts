import { Service, signal } from '@angular/core';
import { Habit, HabitDraft } from '../habit.model';

@Service()
export class HabitService {
  private readonly _habits = signal<readonly Habit[]>([
    {
      id: 'id1',
      name: 'coding training',
      category: 'study',
      reminder: '07:30',
      scheduledDays: [0, 1, 2, 3, 4, 5, 6],
      completedDates: [],
    },
    {
      id: 'id2',
      name: 'reading 10 pages',
      category: 'reading',
      reminder: '22:30',
      scheduledDays: [0, 1, 2, 3, 4, 5, 6],
      completedDates: [],
    },
    {
      id: 'id3',
      name: "cleaning cat's stuff",
      category: 'cats',
      reminder: null,
      scheduledDays: [0, 1, 2, 3, 4, 5, 6],
      completedDates: [],
    },
  ]);

  readonly habits = this._habits.asReadonly();

  delete(id: string) {
    this._habits.update((habits) => habits.filter((habit) => habit.id !== id));
  }

  add(habit: HabitDraft) {
    const newHabit: Habit = {
      name: habit.name.trim(),
      category: habit.category,
      id: crypto.randomUUID(),
      reminder: habit.reminder,
      scheduledDays: habit.scheduledDays,
      completedDates: [],
    };

    this._habits.update((habits) => [...habits, newHabit]);
  }

  edit(id: string, habit: HabitDraft) {
    this._habits.update((habits) =>
      habits.map((h) => (h.id === id ? { ...h, ...habit, name: habit.name.trim() } : h)),
    );
  }

  toggleCompletedDate(id: string, date: string) {
    this._habits.update((habits) =>
      habits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completedDates: habit.completedDates.includes(date)
                ? habit.completedDates.filter((d) => d !== date)
                : [...habit.completedDates, date],
            }
          : habit,
      ),
    );
  }
}
