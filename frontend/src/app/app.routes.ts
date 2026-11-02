import { Routes } from '@angular/router';
import { HabitList } from './features/habits/habit-list/habit-list';
import { TodayPage } from './features/today/today-page/today-page';
import { StatsPage } from './features/stats/stats-page/stats-page';
import { CoachPage } from './features/coach/coach-page/coach-page';
import { EditHabit } from './features/habits/edit-habit/edit-habit';
import { NewHabit } from './features/habits/new-habit/new-habit';

export const routes: Routes = [
  {
    path: '',
    component: TodayPage,
    pathMatch: 'full',
  },
  {
    path: 'habits',
    children: [
      {
        path: '',
        component: HabitList,
      },
      {
        path: 'add',
        component: NewHabit,
      },
      {
        path: ':id/edit',
        component: EditHabit,
      },
    ],
  },

  {
    path: 'stats',
    component: StatsPage,
  },
  {
    path: 'coach',
    component: CoachPage,
  },
];
