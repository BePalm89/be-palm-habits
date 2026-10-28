import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  LucideChartColumn,
  LucideCircleCheck,
  LucideDynamicIcon,
  LucideIcon,
  LucideList,
  LucideMessageCircle,
} from '@lucide/angular';

type TabItem = {
  path: string;
  label: string;
  exact: boolean;
  icon: LucideIcon;
};

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LucideDynamicIcon],
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
}
