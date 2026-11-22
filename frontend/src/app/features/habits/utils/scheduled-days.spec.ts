import { HabitSchedule, When } from '../habit.model';
import { fromScheduledDays, toScheduledDays } from './scheduled-days';

const casesToScheduledDays: { when: When; days: boolean[]; expected: number[] }[] = [
  {
    when: 'every-day',
    days: [false, false, false, false, false, false, false],
    expected: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    when: 'chosen-days',
    days: [true, false, true, false, true, false, false],
    expected: [0, 2, 4],
  },
  {
    when: 'chosen-days',
    days: [false, false, false, false, false, false, true],
    expected: [6],
  },
  {
    when: 'every-day',
    days: [true, false, true, false, false, false, false],
    expected: [0, 1, 2, 3, 4, 5, 6],
  },
];

const casesFromScheduledDays: { scheduledDays: number[]; expected: HabitSchedule }[] = [
  {
    scheduledDays: [0, 1, 2, 3, 4, 5, 6],
    expected: { when: 'every-day', days: [false, false, false, false, false, false, false] },
  },
  {
    scheduledDays: [0, 2, 4],
    expected: { when: 'chosen-days', days: [true, false, true, false, true, false, false] },
  },
  {
    scheduledDays: [6],
    expected: { when: 'chosen-days', days: [false, false, false, false, false, false, true] },
  },
  {
    scheduledDays: [4, 0, 2, 1, 6, 5, 3],
    expected: { when: 'every-day', days: [false, false, false, false, false, false, false] },
  },
];

describe('toScheduledDays', () => {
  it.each(casesToScheduledDays)(
    'returns $expected when $when and days are $days',
    ({ when, days, expected }) => {
      expect(toScheduledDays(when, days)).toEqual(expected);
    },
  );
});

describe('fromScheduledDays', () => {
  it.each(casesFromScheduledDays)(
    'returns $expected when scheduledDays are $scheduledDays',
    ({ scheduledDays, expected }) => {
      expect(fromScheduledDays(scheduledDays)).toEqual(expected);
    },
  );
});
