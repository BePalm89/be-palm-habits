import { Habit } from '../../habits/habit.model';

export function todayHabits(habits: readonly Habit[], day: Date): Habit[] {
  const dayOfTheWeek = day.getDay();
  const mapDayOfTheWeek = getDayNumber(dayOfTheWeek);

  const habitsForToday = habits.filter((habit) => habit.scheduledDays.includes(mapDayOfTheWeek));

  return habitsForToday;
}

function getDayNumber(dayNumber: number): number {
  if (dayNumber === 0) {
    return dayNumber + 6;
  } else {
    return dayNumber - 1;
  }
}
