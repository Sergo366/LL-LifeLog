import React from 'react';
import { CalendarItem } from '@/entities/CalendarItem';
import { getCurrentWeekDates } from '@/features/Calendar/utils';
import classes from './styles/styles.module.css';

const weekDates = getCurrentWeekDates();

export const Calendar = () => {
  return (
    <div className={classes.calendar}>
      {weekDates.map((day) => (
        <CalendarItem key={day.id} day={day} />
      ))}
    </div>
  );
};
