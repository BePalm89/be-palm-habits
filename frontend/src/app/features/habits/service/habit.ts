import { Service, signal } from '@angular/core';
import { EVERY_DAY, Habit, HabitDraft } from '../habit.model';

@Service()
export class HabitService {
  private readonly _habits = signal<readonly Habit[]>([
    {
      id: 'id1',
      name: 'coding training',
      category: 'study',
      reminder: '07:30',
      scheduledDays: [0, 1, 2, 3, 4, 5, 6],
    },
    {
      id: 'id2',
      name: 'reading 10 pages',
      category: 'reading',
      reminder: '22:30',
      scheduledDays: [0, 1, 2, 3, 4, 5, 6],
    },
    {
      id: 'id3',
      name: "cleaning cat's stuff",
      category: 'cats',
      reminder: '08:00',
      scheduledDays: [0, 1, 2, 3, 4, 5, 6],
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
      reminder: null,
      scheduledDays: habit.scheduledDays,
    };

    this._habits.update((habits) => [...habits, newHabit]);
  }

  edit(id: string, habit: HabitDraft) {
    this._habits.update((habits) =>
      habits.map((h) => (h.id === id ? { ...h, ...habit, name: habit.name.trim() } : h)),
    );
  }
}
