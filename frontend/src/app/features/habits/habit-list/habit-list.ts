import { Component, inject } from '@angular/core';
import { HabitRow } from '../habit-row/habit-row';
import { HabitService } from '../service/habit';

@Component({
  imports: [HabitRow],
  selector: 'app-habit-list',
  styleUrl: './habit-list.css',
  templateUrl: './habit-list.html',
})
export class HabitList {
  private readonly habitService = inject(HabitService);

  protected readonly habits = this.habitService.habits;

  protected onDelete(id: string) {
    this.habitService.delete(id);
  }
}
