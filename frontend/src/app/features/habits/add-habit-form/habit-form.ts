import { Component, inject, input, linkedSignal } from '@angular/core';
import { form, FormField, FormRoot, maxLength, required, validate } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { isBlank } from '../validators/is-blank';
import { CATEGORIES, Category, Habit } from '../habit.model';
import { HabitService } from '../service/habit';

interface AddHabitFormInterface {
  name: string;
  category: Category | '';
}

@Component({
  imports: [FormField, FormRoot],
  selector: 'app-habit-form',
  styleUrl: './habit-form.css',
  templateUrl: './habit-form.html',
})
export class HabitForm {
  readonly habit = input<Habit>();
  protected readonly categories = CATEGORIES;
  protected readonly addHabitFormModel = linkedSignal<AddHabitFormInterface>(() => ({
    name: this.habit()?.name ?? '',
    category: this.habit()?.category ?? '',
  }));
  private readonly habitsService = inject(HabitService);
  private readonly router = inject(Router);

  protected readonly addHabitForm = form(
    this.addHabitFormModel,
    (schemaPath) => {
      required(schemaPath.name, { message: 'Name is required' });
      maxLength(schemaPath.name, 40, { message: 'Name must be at most 40 characters' });
      validate(schemaPath.name, ({ value }) => {
        const name = value();
        if (name === '') return null;

        if (isBlank(name)) {
          return { kind: 'blank', message: 'Name cannot contain only spaces' };
        }

        const trimmedValue = name.trim();

        return trimmedValue.length < 2
          ? { kind: 'minLength', message: 'Name must be at least 2 characters' }
          : null;
      });
      required(schemaPath.category, { message: 'Category is required' });
    },
    {
      submission: {
        action: async (f) => {
          const { name, category } = f().value();

          if (category === '') return;
          this.habitsService.add({ name, category });
          this.router.navigate(['/habits']);
        },
      },
    },
  );
}
