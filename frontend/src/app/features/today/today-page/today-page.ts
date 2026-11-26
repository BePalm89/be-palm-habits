import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { HabitService } from '../../habits/service/habit';
import { todayHabits } from '../utils/today-habits';
import { TodayHabitRow } from '../today-habit-row/today-habit-row';
import { TodayHeader } from '../today-header/today-header';
import { toDateKey } from '../../shared/utils/date-key';
import { remainingHabitNames } from '../utils/remaining-habit-names';

@Component({
  imports: [TodayHabitRow, TodayHeader],
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

  protected readonly todayKey = computed(() => toDateKey(this.today()));

  protected readonly remaining = computed(() =>
    remainingHabitNames(this.habitsForToday(), this.todayKey()),
  );

  protected readonly total = computed(() => this.habitsForToday().length);

  protected readonly done = computed(() => this.total() - this.remaining().length);

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.today.set(new Date());
    }, 60000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  protected onToggle(id: string) {
    this.habitService.toggleCompletedDate(id, this.todayKey());
  }
}
