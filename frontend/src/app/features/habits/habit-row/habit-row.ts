import { Component, input } from '@angular/core';
import { Habit } from '../habit.model';

@Component({
  imports: [],
  selector: 'app-habit-row',
  styleUrl: './habit-row.css',
  templateUrl: './habit-row.html',
})
export class HabitRow {
  readonly habit = input.required<Habit>();
}
