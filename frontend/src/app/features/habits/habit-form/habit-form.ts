import { Component, input, linkedSignal, output } from '@angular/core';
import { form, FormField, FormRoot, maxLength, required, validate } from '@angular/forms/signals';
import { isBlank } from '../validators/is-blank';
import { CATEGORIES, Category, Habit, HabitDraft, When } from '../habit.model';
import { fromScheduledDays, toScheduledDays } from '../utils/scheduled-days';

export interface AddHabitFormInterface {
  name: string;
  category: Category | '';
  when: When;
  days: boolean[];
}

@Component({
  imports: [FormField, FormRoot],
  selector: 'app-habit-form',
  styleUrl: './habit-form.css',
  templateUrl: './habit-form.html',
})
export class HabitForm {
  readonly habit = input<Habit>();
  readonly nameButton = input.required<string>();
  readonly save = output<HabitDraft>();
  protected DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  protected readonly categories = CATEGORIES;
  protected readonly addHabitFormModel = linkedSignal<AddHabitFormInterface>(() => {
    const habit = this.habit();

    if (!habit) {
      return {
        name: '',
        category: '',
        when: 'every-day',
        days: [false, false, false, false, false, false, false],
      };
    }

    return {
      name: habit.name,
      category: habit.category,
      ...fromScheduledDays(habit.scheduledDays),
    };
  });

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
      validate(schemaPath.days, ({ value, valueOf }) => {
        const when = valueOf(schemaPath.when);
        const days = value();

        if (when === 'chosen-days' && !days.some((day) => day)) {
          return { kind: 'atLeastOne', message: 'Choose at least one day' };
        }

        return null;
      });
    },
    {
      submission: {
        action: async (f) => {
          const { name, category, when, days } = f().value();

          const scheduledDays = toScheduledDays(when, days);

          if (category === '') return;
          this.save.emit({ name, category, scheduledDays });
        },
      },
    },
  );
}
