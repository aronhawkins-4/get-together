'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { CalendarPlus, LoaderCircle, Plus, Trash2 } from 'lucide-react';
import { IdeasForm } from './ideas-form';

import { EventScheduleDialog } from './event-schedule-dialog';
import { VoteButtons } from './vote-buttons';

import { Tables } from '../types/supabase.types';

import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { deleteEvent } from '../functions/actions/events/deleteEvent';

interface IdeasListProps {
  events: Tables<'events'>[];
}
export const IdeasList: React.FC<IdeasListProps> = ({ events }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDeleteEvent = async (id: number, name: string) => {
    try {
      const { error } = await deleteEvent(id);
      if (error) {
        throw error;
      }
      toast({
        title: 'Event idea removed',
        description: `${name} has been removed from the ideas list`,
      });
      router.refresh();
    } catch (error) {
      console.error(JSON.stringify(error));
      toast({
        title: 'Error removing event idea',
        description: `Error removing ${name} from the ideas list`,
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    setIsUpdating(false);
  }, [events]);
  return (
    <div className='space-y-4'>
      {events.map((event) => {
        return (
          <div key={event.id} className='flex items-center justify-between'>
            <span className='font-medium'>{event.name}</span>
            <div className='flex items-center space-x-4'>
              <div className='flex gap-2'>
                <VoteButtons eventId={event.id} />
                <EventScheduleDialog event={event} icon={CalendarPlus} />
                <Button variant='outline' size='icon' className='w-8 h-8' onClick={() => handleDeleteEvent(event.id, event.name || '')}>
                  <Trash2 className='w-4 text-red-700' />
                </Button>
              </div>
              {/* <Progress value={(activity.votes / activity.total) * 100} className='w-40' />
                      <span className='text-sm text-primary'>
                        {activity.votes}/{activity.total}
                      </span>
                      <Button variant='outline' size='sm'>
                        Vote
                      </Button> */}
            </div>
          </div>
        );
      })}
      {isUpdating && <LoaderCircle className='animate-spin' />}
      <div className='mt-4 flex gap-2 w-full'>
        {!isFormOpen && (
          <Button variant='outline' className='w-full' onClick={() => setIsFormOpen(true)}>
            <Plus className='w-4 h-4 mr-2' />
            Add new idea
          </Button>
        )}
        {isFormOpen && (
          <div className='flex gap-2 w-full'>
            <IdeasForm setIsOpen={setIsFormOpen} setIsUpdating={setIsUpdating} />
            <Button variant={'outline'} onClick={() => setIsFormOpen(false)}>
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
