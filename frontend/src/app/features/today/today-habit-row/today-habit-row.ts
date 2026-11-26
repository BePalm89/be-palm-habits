import { Component, input, output } from '@angular/core';
import { Habit } from '../../habits/habit.model';
import { AvatarCategory } from '../../shared/avatar-category/avatar-category';
import { LucideCheck } from '@lucide/angular';

@Component({
  imports: [AvatarCategory, LucideCheck],
  selector: 'app-today-habit-row',
  styleUrl: './today-habit-row.css',
  templateUrl: './today-habit-row.html',
})
export class TodayHabitRow {
  readonly habit = input.required<Habit>();
  readonly isDone = input.required<boolean>();
  readonly toggle = output<string>();
}
