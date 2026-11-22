import { HabitSchedule, EVERY_DAY, When } from '../habit.model';

export function toScheduledDays(when: When, days: boolean[]): number[] {
  if (when === 'every-day') {
    return [...EVERY_DAY];
  }

  const scheduledDays: number[] = [];

  for (let i = 0; i < days.length; i++) {
    if (days[i]) {
      scheduledDays.push(i);
    }
  }

  return scheduledDays;
}

export function fromScheduledDays(scheduledDays: number[]): HabitSchedule {
  if (scheduledDays.length === 7) {
    return {
      when: 'every-day',
      days: [false, false, false, false, false, false, false],
    };
  }

  const days = [false, false, false, false, false, false, false];

  for (const day of scheduledDays) {
    days[day] = true;
  }

  return {
    when: 'chosen-days',
    days,
  };
}
