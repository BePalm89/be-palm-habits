import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isBlank } from './is-blank';

export function notBlank(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value == null || value === '') return null;

  if (isBlank(value)) return { blank: true };

  return null;
}
