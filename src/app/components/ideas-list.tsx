'use client';
import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { CalendarPlus, Plus, Trash2 } from 'lucide-react';
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
  // const { ideas, removeIdea, setIdeas } = useIdeasStore();
  // const { removeEvent } = useEventsStore();
  const [isAddingIdea, setIsAddingIdea] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

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
      <div className='mt-4 flex gap-2 w-full'>
        {!isAddingIdea && (
          <Button variant='outline' className='w-full' onClick={() => setIsAddingIdea(true)}>
            <Plus className='w-4 h-4 mr-2' />
            Add new idea
          </Button>
        )}
        {isAddingIdea && (
          <div className='flex gap-2 w-full'>
            <IdeasForm setIsAddingIdea={setIsAddingIdea} />
            <Button variant={'outline'} onClick={() => setIsAddingIdea(false)}>
              Cancel
            </Button>
          </div>
        )}
        {/* <Button
          variant='outline'
          className=''
          onClick={() => {
            setEvents(defaultIdeas);
            // clearEvents();
          }}
        >
          <RefreshCcw className='w-4 h-4 mr-2' />
          Reset ideas
        </Button> */}
      </div>
    </div>
  );
};
