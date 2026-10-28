import { Routes } from '@angular/router';
import { HabitList } from './features/habits/habit-list/habit-list';
import { AddHabitForm } from './features/habits/add-habit-form/add-habit-form';
import { TodayPage } from './features/today/today-page/today-page';
import { StatsPage } from './features/stats/stats-page/stats-page';
import { CoachPage } from './features/coach/coach-page/coach-page';

export const routes: Routes = [
  {
    path: '',
    component: TodayPage,
    pathMatch: 'full',
  },
  {
    path: 'habits',
    component: HabitList,
  },
  {
    path: 'habits/add',
    component: AddHabitForm,
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
