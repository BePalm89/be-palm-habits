import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LucideX } from '@lucide/angular';
import { HabitForm } from '../habit-form/habit-form';
import { Habit, HabitDraft } from '../habit.model';
import { HabitService } from '../service/habit';

@Component({
  imports: [LucideX, RouterLink, HabitForm],
  selector: 'app-new-habit',
  styleUrl: './new-habit.css',
  templateUrl: './new-habit.html',
})
export class NewHabit {
  private readonly habitsService = inject(HabitService);
  private readonly router = inject(Router);

  protected add(habit: HabitDraft) {
    this.habitsService.add(habit);
    this.router.navigate(['/habits']);
  }
}
