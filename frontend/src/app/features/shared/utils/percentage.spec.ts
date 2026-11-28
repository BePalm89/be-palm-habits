import { toPercent } from './percentage';

const cases = [
  { done: 1, total: 3, expected: 33 },
  { done: 2, total: 3, expected: 67 },
  { done: 0, total: 3, expected: 0 },
  { done: 3, total: 3, expected: 100 },
  { done: 0, total: 0, expected: 0 },
];

describe('toPercent', () => {
  it.each(cases)(
    'returns $expected when done is $done and total is $total',
    ({ done, total, expected }) => {
      expect(toPercent(done, total)).toBe(expected);
    },
  );
});
