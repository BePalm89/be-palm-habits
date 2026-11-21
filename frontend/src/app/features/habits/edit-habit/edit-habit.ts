import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideX, LucideArrowLeft } from '@lucide/angular';
import { HabitForm } from '../add-habit-form/habit-form';
import { HabitService } from '../service/habit';

@Component({
  imports: [RouterLink, LucideX, HabitForm, LucideArrowLeft],
  selector: 'app-edit-habit',
  styleUrl: './edit-habit.css',
  templateUrl: './edit-habit.html',
})
export class EditHabit {
  readonly id = input.required<string>();

  private readonly habitService = inject(HabitService);

  protected readonly habit = computed(() => {
    return this.habitService.habits().find((habit) => habit.id === this.id());
  });
}
