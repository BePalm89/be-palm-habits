import { Component, input, output } from '@angular/core';
import { Habit } from '../habit.model';
import { LucideSquarePen } from '@lucide/angular';
import { RouterLink } from '@angular/router';

@Component({
  imports: [LucideSquarePen, RouterLink],
  selector: 'app-habit-row',
  styleUrl: './habit-row.css',
  templateUrl: './habit-row.html',
})
export class HabitRow {
  readonly habit = input.required<Habit>();
  readonly delete = output<string>();
  readonly id = input<string>();
}
