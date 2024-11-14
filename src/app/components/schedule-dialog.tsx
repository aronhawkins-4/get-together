'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { DialogHeader, Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { TimePicker12Hour } from '@/components/ui/TimePicker/time-picker-12-hour';
import { add } from 'date-fns';

import React, { useState } from 'react';
import { Tables } from '../types/supabase.types';
import { useEventsStore } from '../hooks/useEventsStore';
import { useToast } from '@/hooks/use-toast';

interface ScheduleDialogProps {
  event: Tables<'Events'>;
  icon?: React.ComponentType<{ className?: string }>;
}
export const ScheduleDialog: React.FC<ScheduleDialogProps> = ({ event, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const { updateEvent } = useEventsStore();
  const { toast } = useToast();
  const handleSelect = (newDay: Date | undefined) => {
    if (!newDay) return;
    if (!date) {
      setDate(newDay);
      return;
    }
    const diff = newDay.getTime() - date.getTime();
    const diffInDays = diff / (1000 * 60 * 60 * 24);
    const newDateFull = add(date, { days: Math.ceil(diffInDays) });
    setDate(newDateFull);
  };
  const handleScheduleEvent = () => {
    if (!date) {
      return;
    }
    if (date.getTime() < new Date().getTime()) {
      toast({
        title: 'Invalid date',
        description: 'Event cannot be scheduled in the past',
      });
      return;
    }
    const updatedEvent: Tables<'Events'> = { ...event, start_datetime: date.toISOString(), is_idea: false };
    updateEvent(updatedEvent);
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button size={'icon'} className='w-8 h-8' variant={'outline'} onClick={() => setIsOpen(true)}>
        {Icon && <Icon className='w-4' />}
      </Button>
      <DialogContent className='bg-primary-foreground max-w-2xl w-fit'>
        <DialogHeader className='text-primary'>
          <DialogTitle>Schedule Event</DialogTitle>
          <DialogDescription>{event.name}</DialogDescription>
        </DialogHeader>
        <div className='flex gap-2'>
          <Calendar className='text-primary' mode='single' selected={date} onSelect={(d) => handleSelect(d)} />
          <div className='flex flex-col justify-between p-3'>
            <TimePicker12Hour date={date} setDate={setDate} />
            <Button onClick={handleScheduleEvent}>Schedule Event</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
