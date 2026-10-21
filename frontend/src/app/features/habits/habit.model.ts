export const CATEGORIES = ['study', 'health', 'sport'] as const;
export type Category = (typeof CATEGORIES)[number];

export type Habit = {
  id: string;
  name: string;
  category: Category;
  reminder: string | null; // "HH:mm" (24h), null = no reminder
  scheduledDays: number[]; // 0 = Monday … 6 = Sunday (≠ Date.getDay(), where 0 = Sunday!)
};
