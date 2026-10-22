import { Routes } from '@angular/router';
import { HabitList } from './features/habits/habit-list/habit-list';
import { AddHabitForm } from './features/habits/add-habit-form/add-habit-form';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/habits',
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
];
