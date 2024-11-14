'use client';

import * as React from 'react';
import { Label } from '@/components/ui/label';

import { Period } from './time-picker-utils';
import { TimePickerPeriodSelect } from './time-picker-period-select';
import { TimePickerTimeSelect } from './time-picker-time-select';

interface TimePicker12HourProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function TimePicker12Hour({ date, setDate }: TimePicker12HourProps) {
  const [period, setPeriod] = React.useState<Period>('PM');

  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const periodRef = React.useRef<HTMLButtonElement>(null);

  return (
    <div className='flex items-start gap-2 text-primary'>
      <div className='grid gap-1 text-center'>
        <Label htmlFor='hours' className='text-xs text-start'>
          Hour
        </Label>
        <TimePickerTimeSelect type='12hours' period={period} date={date} setDate={setDate} ref={hourRef} onRightFocus={() => minuteRef.current?.focus()} />
      </div>
      <div className='grid gap-1 text-center'>
        <Label htmlFor='minutes' className='text-xs text-start'>
          Minute
        </Label>
        <TimePickerTimeSelect type='minutes' date={date} setDate={setDate} ref={hourRef} onLeftFocus={() => hourRef.current?.focus()} onRightFocus={() => periodRef.current?.focus()} />
      </div>
      <div className='grid gap-1 text-center'>
        <Label htmlFor='period' className='text-xs text-start'>
          Period
        </Label>
        <TimePickerPeriodSelect period={period} setPeriod={setPeriod} date={date} setDate={setDate} ref={periodRef} onLeftFocus={() => minuteRef.current?.focus()} />
      </div>
    </div>
  );
}
