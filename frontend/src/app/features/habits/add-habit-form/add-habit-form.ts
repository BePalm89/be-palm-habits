import { Component, signal } from '@angular/core';
import { form, FormField, maxLength, required, validate } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { isBlank } from '../validators/is-blank';
import { CATEGORIES, Category } from '../habit.model';

interface AddHabitFormInterface {
  name: string;
  category: Category | '';
}

@Component({
  imports: [RouterLink, FormField],
  selector: 'app-add-habit-form',
  styleUrl: './add-habit-form.css',
  templateUrl: './add-habit-form.html',
})
export class AddHabitForm {
  protected readonly categories = CATEGORIES;
  protected readonly addHabitFormModel = signal<AddHabitFormInterface>({
    name: '',
    category: '',
  });

  protected readonly addHabitForm = form(this.addHabitFormModel, (schemaPath) => {
    required(schemaPath.name);
    maxLength(schemaPath.name, 40);
    validate(schemaPath.name, ({ value }) => {
      const name = value();
      if (name === '') return null;

      if (isBlank(name)) {
        return { kind: 'blank' };
      }

      const trimmedValue = name.trim();

      return trimmedValue.length < 2 ? { kind: 'minLength' } : null;
    });
    required(schemaPath.category);
  });
}
