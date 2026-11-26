import { Habit } from '../../habits/habit.model';

export function remainingHabitNames(
  habits: readonly Pick<Habit, 'name' | 'completedDates'>[],
  dateKey: string,
): string[] {
  return habits
    .filter((habit) => !habit.completedDates.includes(dateKey))
    .map((habit) => habit.name);
}
