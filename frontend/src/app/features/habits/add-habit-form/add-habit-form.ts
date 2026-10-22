import { Component, signal } from '@angular/core';
import { form, required, validate } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { isBlank } from '../validators/is-blank';

interface AddHabitFormInterface {
  name: string;
}

const addHabitFormModel = signal<AddHabitFormInterface>({
  name: '',
});

@Component({
  imports: [RouterLink],
  selector: 'app-add-habit-form',
  styleUrl: './add-habit-form.css',
  templateUrl: './add-habit-form.html',
})
export class AddHabitForm {
  constructor() {
    const addHabitForm = form(addHabitFormModel, (schemaPath) => {
      required(schemaPath.name);
    });
  }
}
