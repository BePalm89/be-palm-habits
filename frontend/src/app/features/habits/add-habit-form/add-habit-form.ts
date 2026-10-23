import { Component, signal } from '@angular/core';
import { form, required, validate } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';

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
  protected readonly addHabitFormModel = signal<AddHabitFormInterface>({
    name: '',
  });

  protected readonly addHabitForm = form(this.addHabitFormModel, (schemaPath) => {
    required(schemaPath.name);
    //validate(schemaPath.name, ({ value }) => notBlank(value));
  });
}
