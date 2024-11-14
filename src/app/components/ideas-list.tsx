'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCcw, Trash2 } from 'lucide-react';
import { IdeasForm } from './ideas-form';
import { useEventsStore } from '../hooks/useEventsStore';
import { ScheduleDialog } from './schedule-dialog';

const defaultIdeas = [
  {
    created_at: '2024-11-06T09:30:00Z',
    end_datetime: '2024-11-06T10:30:00Z',
    id: 1,
    is_idea: true,
    name: 'Morning Yoga Session',
    start_datetime: '2024-11-06T09:00:00Z',
  },
  {
    created_at: '2024-11-06T11:00:00Z',
    end_datetime: '2024-11-06T12:00:00Z',
    id: 2,
    is_idea: true,
    name: 'Team Standup Meeting',
    start_datetime: '2024-11-06T11:30:00Z',
  },
  {
    created_at: '2024-11-06T13:15:00Z',
    end_datetime: null,
    id: 3,
    is_idea: true,
    name: 'Brainstorming for Marketing Campaign',
    start_datetime: '2024-11-06T09:00:00Z',
  },
  {
    created_at: '2024-11-06T14:00:00Z',
    end_datetime: '2024-11-06T15:30:00Z',
    id: 4,
    is_idea: true,
    name: 'Client Presentation',
    start_datetime: '2024-11-06T14:30:00Z',
  },
];

export const IdeasList = () => {
  // const { ideas, removeIdea, setIdeas } = useIdeasStore();
  const { events, removeEvent, setEvents } = useEventsStore();
  const [isAddingIdea, setIsAddingIdea] = useState(false);

  return (
    <div className='space-y-4'>
      {events.map((event) => {
        if (!event.is_idea) {
          return null;
        }
        return (
          <div key={event.id} className='flex items-center justify-between'>
            <span className='font-medium'>{event.name}</span>
            <div className='flex items-center space-x-4'>
              <div className='flex gap-2'>
                {/* <Button variant='outline' size='icon' className='w-8 h-8' onClick={() => handleUpgradeEvent(event)}>
                  <Plus className='w-4' />
                </Button> */}
                <ScheduleDialog event={event} icon={Plus} />
                <Button variant='outline' size='icon' className='w-8 h-8' onClick={() => removeEvent(event.id)}>
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
            <IdeasForm />
            <Button variant={'outline'} onClick={() => setIsAddingIdea(false)}>
              Cancel
            </Button>
          </div>
        )}
        <Button
          variant='outline'
          className=''
          onClick={() => {
            setEvents(defaultIdeas);
            // clearEvents();
          }}
        >
          <RefreshCcw className='w-4 h-4 mr-2' />
          Reset ideas
        </Button>
      </div>
    </div>
  );
};
