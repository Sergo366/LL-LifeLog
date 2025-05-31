import { WeekDates } from '@/features/Calendar/types';

export function getCurrentWeekDates(): WeekDates[] {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const result = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(today.getDate() + mondayOffset + i);

    result.push({
      id: i,
      name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      activeDay: date.toDateString() === today.toDateString(),
      monthShort: date.toLocaleDateString('en-US', { month: 'short' }),
      dayName: date.toLocaleDateString('en-US', { weekday: 'long' }),
      numberOfDay: date.getDate(),
    });
  }

  return result;
}
