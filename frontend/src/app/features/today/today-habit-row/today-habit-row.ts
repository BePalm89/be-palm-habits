import { Component, input } from '@angular/core';
import { Habit } from '../../habits/habit.model';
import { AvatarCategory } from '../../shared/avatar-category/avatar-category';

@Component({
  imports: [AvatarCategory],
  selector: 'app-today-habit-row',
  styleUrl: './today-habit-row.css',
  templateUrl: './today-habit-row.html',
})
export class TodayHabitRow {
  readonly habit = input.required<Habit>();
}
