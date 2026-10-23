import { Component, signal } from '@angular/core';
import { form, FormField, maxLength, required, validate } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { isBlank } from '../validators/is-blank';

interface AddHabitFormInterface {
  name: string;
}

@Component({
  imports: [RouterLink, FormField],
  selector: 'app-add-habit-form',
  styleUrl: './add-habit-form.css',
  templateUrl: './add-habit-form.html',
})
export class AddHabitForm {
  protected readonly addHabitFormModel = signal<AddHabitFormInterface>({
    name: '',
  });

  protected readonly addHabitForm = form(this.addHabitFormModel, (schemaPath) => {
    required(schemaPath.name);
    validate(schemaPath.name, ({ value }) => {
      const name = value();

      if (isBlank(name)) return null;

      const trimmedValue = name.trim();

      return trimmedValue.length < 2 ? { kind: 'minLength' } : null;
    });
    maxLength(schemaPath.name, 40);
    validate(schemaPath.name, ({ value }) => {
      const name = value();
      if (name === '') return null;

      if (isBlank(name)) {
        return { kind: 'blank' };
      }

      return null;
    });
  });
}
