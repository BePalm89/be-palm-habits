import { Habit } from '../../habits/habit.model';
import { todayHabits } from './today-habits';

describe('todayHabits', () => {
  it.each([
    {
      habits: [
        makeHabit({ id: 'h1', name: 'all every day 1', scheduledDays: [0, 1, 2, 3, 4, 5, 6] }),
        makeHabit({ id: 'h2', name: 'all every day 2', scheduledDays: [0, 1, 2, 3, 4, 5, 6] }),
      ],
      day: new Date(2026, 9, 29), // giovedi
      expected: [
        makeHabit({ id: 'h1', name: 'all every day 1', scheduledDays: [0, 1, 2, 3, 4, 5, 6] }),
        makeHabit({ id: 'h2', name: 'all every day 2', scheduledDays: [0, 1, 2, 3, 4, 5, 6] }),
      ],
    },
    {
      habits: [
        makeHabit({ id: 'h1', name: 'all every day', scheduledDays: [0, 1, 2, 3, 4, 5, 6] }),
        makeHabit({ id: 'h2', name: 'some days', scheduledDays: [0, 2, 4] }),
      ],
      day: new Date(2026, 9, 29), // giovedi
      expected: [
        makeHabit({ id: 'h1', name: 'all every day', scheduledDays: [0, 1, 2, 3, 4, 5, 6] }),
      ],
    },
    {
      habits: [],
      day: new Date(2026, 9, 29), // giovedi
      expected: [],
    },
    {
      habits: [
        makeHabit({ id: 'h1', name: 'not for today', scheduledDays: [0, 1] }),
        makeHabit({ id: 'h2', name: 'not for today', scheduledDays: [5, 6] }),
      ],
      day: new Date(2026, 9, 29), // giovedi
      expected: [],
    },
    {
      habits: [
        makeHabit({ id: 'h1', name: 'not for today', scheduledDays: [0, 1] }),
        makeHabit({ id: 'h2', name: 'for sunday', scheduledDays: [5, 6] }),
      ],
      day: new Date(2026, 10, 1), // domenica
      expected: [makeHabit({ id: 'h2', name: 'for sunday', scheduledDays: [5, 6] })],
    },
    {
      habits: [
        makeHabit({ id: 'h1', name: 'for monday', scheduledDays: [0, 1] }),
        makeHabit({ id: 'h2', name: 'for sunday', scheduledDays: [5, 6] }),
      ],
      day: new Date(2026, 10, 2), // lunedi
      expected: [makeHabit({ id: 'h1', name: 'for monday', scheduledDays: [0, 1] })],
    },
  ])('today', ({ habits, day, expected }) => {
    expect(todayHabits(habits, day)).toEqual(expected);
  });
});

function makeHabit(overrides: Partial<Habit>): Habit {
  return {
    id: 'x',
    name: 'test',
    category: 'study',
    reminder: null,
    scheduledDays: [],
    ...overrides,
  };
}
