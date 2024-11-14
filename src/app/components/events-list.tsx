'use client';
import React from 'react';

import { useEventsStore } from '../hooks/useEventsStore';
import { Button } from '@/components/ui/button';
import { Minus, Pencil } from 'lucide-react';
import { Tables } from '../types/supabase.types';
import { format } from 'date-fns';
import { ScheduleDialog } from './schedule-dialog';

export const EventsList = () => {
  const { events, updateEvent } = useEventsStore();
  const handleDowngradeEvent = (event: Tables<'Events'>) => {
    updateEvent({ ...event, is_idea: true });
  };

  return (
    <div className='flex flex-col gap-4'>
      {(!events || events.filter((event) => !event.is_idea).length === 0) && <p>No events have been scheduled yet.</p>}
      {events &&
        events.length > 0 &&
        events.map((event) => {
          if (event.is_idea) {
            return null;
          }
          const formattedStartDatetime = format(new Date(event?.start_datetime || ''), 'MMM d, yyyy h:mm a');
          return (
            <div key={event.id} className='flex items-center justify-between'>
              <span className='font-medium'>{event.name}</span>
              <div className='flex items-center gap-4 justify-end'>
                <span className='font-medium'>{formattedStartDatetime}</span>
                <div className='flex items-center gap-2'>
                  <ScheduleDialog event={event} icon={Pencil} />
                  <Button variant='outline' size='icon' className='w-8 h-8' onClick={() => handleDowngradeEvent(event)}>
                    <Minus className='w-4' />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
