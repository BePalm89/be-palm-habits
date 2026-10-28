import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

type TabItem = {
  path: string;
  label: string;
  exact: boolean;
};

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
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
    },
    {
      path: 'habits',
      label: 'Habits',
      exact: false,
    },
    {
      path: 'stats',
      label: 'Stats',
      exact: false,
    },
    {
      path: 'coach',
      label: 'Coach',
      exact: false,
    },
  ];
}
