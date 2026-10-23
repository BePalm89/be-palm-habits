export const CATEGORIES = ['study', 'health', 'sport', 'cats', 'reading'] as const;
export type Category = (typeof CATEGORIES)[number];

export const EVERY_DAY = [0, 1, 2, 3, 4, 5, 6];

export type Habit = {
  id: string;
  name: string;
  category: Category;
  reminder: string | null; // "HH:mm" (24h), null = no reminder
  scheduledDays: number[]; // 0 = Monday … 6 = Sunday (≠ Date.getDay(), where 0 = Sunday!)
};
