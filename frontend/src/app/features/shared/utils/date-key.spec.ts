import { toDateKey } from './date-key';

const cases = [
  { name: 'two digit day and month', date: new Date(2026, 9, 10, 20, 30), expected: '2026-10-10' },
  { name: 'one digit day', date: new Date(2026, 9, 5, 23, 59), expected: '2026-10-05' },
  {
    name: 'one digit day and one digit month',
    date: new Date(2026, 2, 3, 23, 59),
    expected: '2026-03-03',
  },
  { name: 'just after midnight', date: new Date(2026, 9, 5, 0, 30), expected: '2026-10-05' },
];

describe('toDateKey', () => {
  it.each(cases)('returns $expected when the case is $name', ({ date, expected }) => {
    expect(toDateKey(date)).toBe(expected);
  });
});
