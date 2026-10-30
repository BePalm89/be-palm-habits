import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {
  LucideChartColumn,
  LucideCircleCheck,
  LucideList,
  LucideMessageCircle,
} from '@lucide/angular';
import { TabBar, type TabItem } from './layout/tab-bar/tab-bar';

@Component({
  imports: [RouterOutlet, TabBar],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly TAB_ITEMS: TabItem[] = [
    {
      path: '',
      label: 'Today',
      exact: true,
      icon: LucideCircleCheck,
    },
    {
      path: 'habits',
      label: 'Habits',
      exact: false,
      icon: LucideList,
    },
    {
      path: 'stats',
      label: 'Stats',
      exact: false,
      icon: LucideChartColumn,
    },
    {
      path: 'coach',
      label: 'Coach',
      exact: false,
      icon: LucideMessageCircle,
    },
  ];

  test = new Date('2026-11-01');
}
