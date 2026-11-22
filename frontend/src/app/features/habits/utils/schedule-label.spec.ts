import { formatScheduleLabel } from './schedule-label';

const cases = [
  {
    scheduledDays: [0, 1, 2, 3, 4, 5, 6],
    reminder: '07:00',
    expected: 'Every day · 07:00',
  },
  {
    scheduledDays: [0, 1, 2, 3, 4, 5, 6],
    reminder: null,
    expected: 'Every day',
  },
  {
    scheduledDays: [0, 2, 4],
    reminder: '08:00',
    expected: 'Mon, Wed, Fri · 08:00',
  },
  {
    scheduledDays: [4, 2, 0],
    reminder: null,
    expected: 'Mon, Wed, Fri',
  },
  {
    scheduledDays: [6],
    reminder: '20:00',
    expected: 'Sun · 20:00',
  },
];

describe('formatScheduleLabel', () => {
  it.each(cases)(
    'returns $expected when scheduled days are $scheduledDays and the reminder is $reminder',
    ({ scheduledDays, reminder, expected }) => {
      expect(formatScheduleLabel(scheduledDays, reminder)).toBe(expected);
    },
  );
});
