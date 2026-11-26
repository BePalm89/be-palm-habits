import { remainingHabitNames } from './remaining-habit-names';

const cases = [
  {
    name: 'one missing habit',
    habits: [
      { name: 'Catalan', completedDates: ['2026-11-26'] },
      { name: 'Water', completedDates: [] },
    ],
    dateKey: '2026-11-26',
    expected: ['Water'],
  },
  {
    name: 'done only on another day',
    habits: [
      { name: 'Catalan', completedDates: ['2026-11-26'] },
      { name: 'Water', completedDates: ['2026-11-26'] },
    ],
    dateKey: '2026-11-26',
    expected: [],
  },
  {
    name: 'two missing habits',
    habits: [
      { name: 'Catalan', completedDates: ['2026-11-26'] },
      { name: 'Water', completedDates: ['2026-11-26'] },
    ],
    dateKey: '2026-11-27',
    expected: ['Catalan', 'Water'],
  },
];

describe('remainingHabitNames', () => {
  it.each(cases)('returns $expected when the case is $name', ({ habits, dateKey, expected }) => {
    expect(remainingHabitNames(habits, dateKey)).toEqual(expected);
  });
});
