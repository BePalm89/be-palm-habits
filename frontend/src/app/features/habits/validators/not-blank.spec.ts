import { FormControl } from '@angular/forms';
import { notBlank } from './not-blank';

describe('notBlank', () => {
  it.each([
    ['afg', null],
    ['  ', { blank: true }],
    [null, null],
    ['', null],
    [undefined, null],
  ])('notBlank(%j) → %s', (input, expected) => {
    const control = new FormControl(input);
    expect(notBlank(control)).toEqual(expected);
  });
});
