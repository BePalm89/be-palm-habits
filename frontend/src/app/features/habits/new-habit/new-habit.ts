import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideX } from '@lucide/angular';
import { HabitForm } from '../add-habit-form/habit-form';

@Component({
  imports: [LucideX, RouterLink, HabitForm],
  selector: 'app-new-habit',
  styleUrl: './new-habit.css',
  templateUrl: './new-habit.html',
})
export class NewHabit {}
