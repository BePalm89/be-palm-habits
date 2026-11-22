import { Component, computed, input, output } from '@angular/core';
import { Habit } from '../habit.model';
import { LucideSquarePen, LucideTrash } from '@lucide/angular';
import { RouterLink } from '@angular/router';
import { AvatarCategory } from '../../shared/avatar-category/avatar-category';
import { formatScheduleLabel } from '../utils/schedule-label';

@Component({
  imports: [LucideSquarePen, RouterLink, LucideTrash, AvatarCategory],
  selector: 'app-habit-row',
  styleUrl: './habit-row.css',
  templateUrl: './habit-row.html',
})
export class HabitRow {
  readonly habit = input.required<Habit>();
  readonly delete = output<string>();

  protected readonly habitScheduleLabel = computed(() => {
    return formatScheduleLabel(this.habit().scheduledDays, this.habit().reminder);
  });
}
