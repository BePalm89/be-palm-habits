import { isBlank } from './is-blank';

describe('isBlank', () => {
  it.each([
    ['afg', false],
    ['', true],
    ['  ', true],
    ['  run  ', false],
    ['\t', true],
    ['\n', true],
    [' \t', true],
    ['.', false],
    ['/stretch', false],
    ['a', false],
    ['   a   ', false],
  ])('isBlank(%j) → %s', (input, expected) => {
    expect(isBlank(input)).toBe(expected);
  });
});
