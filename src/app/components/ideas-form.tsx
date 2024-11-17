'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import { Resolver, useForm } from 'react-hook-form';

import { useEventsStore } from '../hooks/useEventsStore';
import { Tables } from '../types/supabase.types';

type IdeasFormValues = {
  ideaName: string;
};

const resolver: Resolver<IdeasFormValues> = async (values) => {
  return {
    values: values.ideaName ? values : {},
    errors: !values.ideaName
      ? {
          ideaName: {
            type: 'required',
            message: 'This is required.',
          },
        }
      : {},
  };
};
export const IdeasForm = () => {
  const { addEvent, events } = useEventsStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IdeasFormValues>({ resolver });
  const onSubmit = handleSubmit((data) => {
    const newEvent: Tables<'events'> = {
      created_at: new Date().toISOString(),
      end_datetime: null,
      id: events[events.length - 1].id + 1,
      is_idea: true,
      name: data.ideaName,
      start_datetime: null,
    };
    addEvent(newEvent);
    reset();
  });
  return (
    <form className='flex w-full items-center space-x-2' onSubmit={onSubmit}>
      <div className='flex flex-col gap-2 w-full relative'>
        <Input type='text' placeholder='New event' {...register('ideaName')} />
        {errors?.ideaName && <p className='absolute left-0 top-full'>{errors.ideaName.message}</p>}
      </div>

      <Button type='submit'>Add Event</Button>
    </form>
  );
};
