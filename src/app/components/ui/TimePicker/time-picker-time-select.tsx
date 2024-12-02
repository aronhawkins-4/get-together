'use client';
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';
import { Period, setDateByType } from './time-picker-utils';

interface TimePickerTimeSelectProps {
  type: string;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  period?: Period;
  onRightFocus?: () => void;
  onLeftFocus?: () => void;
}
export const TimePickerTimeSelect = React.forwardRef<HTMLButtonElement, TimePickerTimeSelectProps>(({ type, date, setDate, period, onLeftFocus, onRightFocus }, ref) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowRight') onRightFocus?.();
    if (e.key === 'ArrowLeft') onLeftFocus?.();
  };
  const handleValueChange = (value: string) => {
    if (date) {
      const tempDate = new Date(date);

      switch (type) {
        case '12hours':
          setDate(setDateByType(tempDate, value, type, period));
          break;
        case 'minutes':
          setDate(setDateByType(tempDate, value, type));
          break;
      }
    }
  };
  return (
    <div className='flex h-10 items-center'>
      <Select onValueChange={(value: Period) => handleValueChange(value)}>
        <SelectTrigger ref={ref} className='w-[65px] focus:bg-accent focus:text-accent-foreground' onKeyDown={handleKeyDown}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {type === '12hours' &&
            Array.from(Array(12).keys()).map((timeValue) => {
              return (
                <SelectItem key={timeValue} value={(timeValue + 1).toString()}>
                  {(timeValue + 1).toString().length > 1 ? (timeValue + 1).toString() : `0${timeValue + 1}`}
                </SelectItem>
              );
            })}
          {type === 'minutes' &&
            Array.from(Array(60).keys()).map((timeValue) => {
              return (
                <SelectItem key={timeValue} value={timeValue.toString()}>
                  {timeValue.toString().length > 1 ? timeValue.toString() : `0${timeValue}`}
                </SelectItem>
              );
            })}
        </SelectContent>
      </Select>
    </div>
  );
});

TimePickerTimeSelect.displayName = 'TimePickerTimeSelect';
