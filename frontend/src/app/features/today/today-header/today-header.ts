import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucidePlus } from '@lucide/angular';

@Component({
  imports: [DatePipe, RouterLink, LucidePlus],
  selector: 'app-today-header',
  styleUrl: './today-header.css',
  templateUrl: './today-header.html',
})
export class TodayHeader {
  readonly today = input.required<Date>();
}
