import { Component, input } from '@angular/core';

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
}
