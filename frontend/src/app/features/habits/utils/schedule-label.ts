const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function formatScheduleLabel(scheduledDays: number[], reminder: string | null): string {
  const dayLabel = formatDays(scheduledDays);

  return reminder ? `${dayLabel} · ${reminder}` : dayLabel;
}

function formatDays(scheduledDays: number[]): string {
  if (scheduledDays.length === 7) return 'Every day';

  return [...scheduledDays]
    .sort((a, b) => a - b)
    .map((day) => DAY_NAMES[day])
    .join(', ');
}
