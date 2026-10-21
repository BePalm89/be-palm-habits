import { Component, signal } from '@angular/core';
import { Habit } from '../habit.model';
import { HabitRow } from '../habit-row/habit-row';

@Component({
  imports: [HabitRow],
  selector: 'app-habit-list',
  styleUrl: './habit-list.css',
  templateUrl: './habit-list.html',
})
export class HabitList {
  protected readonly habits = signal<Habit[]>([
    {
      id: 'id1',
      name: 'coding training',
      category: 'study',
      reminder: '07:30',
      scheduledDays: [0, 1, 2, 3, 4, 5, 6],
    },
    {
      id: 'id2',
      name: 'reading 10 pages',
      category: 'reading',
      reminder: '22:30',
      scheduledDays: [0, 1, 2, 3, 4, 5, 6],
    },
    {
      id: 'id3',
      name: "cleaning cat's stuff",
      category: 'cats',
      reminder: '08:00',
      scheduledDays: [0, 1, 2, 3, 4, 5, 6],
    },
  ]);
}
