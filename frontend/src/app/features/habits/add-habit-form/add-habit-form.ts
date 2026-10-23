import { Component, signal } from '@angular/core';
import { form, required, validate } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { notBlank } from '../validators/not-blank';

interface AddHabitFormInterface {
  name: string;
}

@Component({
  imports: [RouterLink],
  selector: 'app-add-habit-form',
  styleUrl: './add-habit-form.css',
  templateUrl: './add-habit-form.html',
})
export class AddHabitForm {
  addHabitFormModel = signal<AddHabitFormInterface>({
    name: '',
  });

  constructor() {
    const addHabitForm = form(this.addHabitFormModel, (schemaPath) => {
      required(schemaPath.name);
      //validate(schemaPath.name, ({ value }) => notBlank(value));
    });
  }
}
