import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { HabitService } from '../../habits/service/habit';
import { todayHabits } from '../utils/today-habits';
import { TodayHabitRow } from '../today-habit-row/today-habit-row';

@Component({
  imports: [TodayHabitRow],
  selector: 'app-today-page',
  styleUrl: './today-page.css',
  templateUrl: './today-page.html',
})
export class TodayPage implements OnInit, OnDestroy {
  private readonly habitService = inject(HabitService);

  protected readonly today = signal<Date>(new Date());

  private interval: number = 0;

  protected readonly habitsForToday = computed(() =>
    todayHabits(this.habitService.habits(), this.today()),
  );

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.today.set(new Date());
    }, 60000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
