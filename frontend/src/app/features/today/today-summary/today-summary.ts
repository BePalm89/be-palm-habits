import { Component, computed, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-today-summary',
  styleUrl: './today-summary.css',
  templateUrl: './today-summary.html',
})
export class TodaySummary {
  readonly done = input.required<number>();
  readonly total = input.required<number>();
  readonly remaining = input.required<string[]>();
  readonly percentage = input.required<number>();
  protected readonly circumference = 34 * 2 * Math.PI;

  protected readonly percentageRing = computed(() => {
    return this.circumference * (1 - this.percentage() / 100);
  });
}
