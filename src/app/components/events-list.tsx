'use client';
import React from 'react';

import { Button } from '@/app/components/ui/button';
import { Minus, Pencil } from 'lucide-react';
import { Tables } from '../types/supabase.types';
import { format } from 'date-fns';
import { EventScheduleDialog } from './event-schedule-dialog';
import { updateEvent } from '../functions/actions/events/updateEvent';
import { useToast } from '@/hooks/use-toast';

interface EventsListProps {
  events: Tables<'events'>[];
}
export const EventsList: React.FC<EventsListProps> = ({ events }) => {
  const { toast } = useToast();

  const handleDowngradeEvent = async (event: Tables<'events'>) => {
    try {
      const { data, error } = await updateEvent({ ...event, is_idea: true, start_datetime: null, end_datetime: null });
      if (error) {
        throw error;
      }
      if (data) {
        toast({
          title: 'Event removed from schedule',
          description: `${event.name} has been removed from the schedule`,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove event from schedule',
        variant: 'destructive',
      });
    }
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
                  <EventScheduleDialog event={event} icon={Pencil} />
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
