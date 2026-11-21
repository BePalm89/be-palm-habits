import { Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LucideX, LucideArrowLeft } from '@lucide/angular';
import { HabitForm } from '../habit-form/habit-form';
import { HabitService } from '../service/habit';
import { Habit } from '../habit.model';

@Component({
  imports: [RouterLink, LucideX, HabitForm, LucideArrowLeft],
  selector: 'app-edit-habit',
  styleUrl: './edit-habit.css',
  templateUrl: './edit-habit.html',
})
export class EditHabit {
  readonly id = input.required<string>();

  private readonly habitService = inject(HabitService);
  private readonly router = inject(Router);

  protected readonly habit = computed(() => {
    return this.habitService.habits().find((habit) => habit.id === this.id());
  });

  protected edit(habit: Pick<Habit, 'name' | 'category'>) {
    this.habitService.edit(this.id(), habit);
    this.router.navigate(['/habits']);
  }
}
