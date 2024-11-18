'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { DialogHeader, Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { TimePicker12Hour } from '@/components/ui/TimePicker/time-picker-12-hour';
import { add } from 'date-fns';

import React, { useState } from 'react';
import { Tables } from '../types/supabase.types';

import { useToast } from '@/hooks/use-toast';
import { Resolver, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { updateEvent } from '../actions/events/updateEvent';
import { useRouter } from 'next/navigation';

interface EventScheduleDialogProps {
  event: Tables<'events'>;
  icon?: React.ComponentType<{ className?: string }>;
}

type ScheduleEventFormValues = {
  id: number;
  startDateTime: Date;
  // endDateTime: Date;
};

const resolver: Resolver<ScheduleEventFormValues> = async (values) => {
  return {
    values: values.startDateTime ? values : {},
    errors: !values.startDateTime
      ? {
          startDateTime: {
            type: 'required',
            message: 'Start date is required.',
          },
          // endDateTime: {
          //   type: 'required',
          //   message: 'End date is required.',
          // },
        }
      : {},
  };
};

export const EventScheduleDialog: React.FC<EventScheduleDialogProps> = ({ event, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm<ScheduleEventFormValues>({ resolver });

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
    setValue('startDateTime', newDateFull);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data);
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
      const updateEventData = { ...event, start_datetime: date.toISOString(), is_idea: false };
      const { data: updatedEvent, error } = await updateEvent(updateEventData);
      if (error) {
        throw error;
      }
      toast({
        title: 'Event scheduled',
        description: `${event.name} has been scheduled for ${date.toLocaleDateString()}`,
      });
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error scheduling event',
        description: `Error scheduling event: ${event.name}`,
        variant: 'destructive',
      });
    }
  });

  // const handleScheduleEvent = () => {
  //   if (!date) {
  //     return;
  //   }
  //   if (date.getTime() < new Date().getTime()) {
  //     toast({
  //       title: 'Invalid date',
  //       description: 'Event cannot be scheduled in the past',
  //     });
  //     return;
  //   }
  //   const updatedEvent: Tables<'events'> = { ...event, start_datetime: date.toISOString(), is_idea: false };

  //   updateEvent(updatedEvent);
  //   setIsOpen(false);
  // };
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
          <Input type='hidden' {...register('id')} value={event.id} />
          <Calendar className='text-primary' mode='single' selected={date} onSelect={(d) => handleSelect(d)} />
          <div className='flex flex-col justify-between p-3'>
            <TimePicker12Hour date={date} setDate={setDate} />
            <Button onClick={onSubmit}>Schedule Event</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
