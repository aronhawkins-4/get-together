'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';

import { useEventsStore } from '../hooks/useEventsStore';
import { Tables } from '../types/supabase.types';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '../utils/supabase/client';
import { toast } from '@/hooks/use-toast';
import { LoaderCircle } from 'lucide-react';
import { createEvent } from '../actions/events/createEvent';

interface IdeasFormProps {
  setIsAddingIdea: React.Dispatch<React.SetStateAction<boolean>>;
}
type IdeasFormValues = {
  ideaName: string;
  getTogetherId: number;
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
export const IdeasForm: React.FC<IdeasFormProps> = ({ setIsAddingIdea }) => {
  const { addEvent, events, removeEvent } = useEventsStore();
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const getTogetherId = pathname.split('/')[2];
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IdeasFormValues>({ resolver });
  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    const newEvent = {
      end_datetime: null,
      is_idea: true,
      name: data.ideaName,
      start_datetime: null,
      get_together: Number(data.getTogetherId),
    };
    try {
      // addEvent(newEvent);
      reset();
      const { data: newEventData, error } = await createEvent({ ...newEvent });

      // const { data: newEventData, error } = await supabase.from('events').insert(newEvent).select().single();
      if (error) {
        throw error;
      }
      console.log(newEventData);
      toast({
        title: 'New event idea created!',
        description: `${newEventData?.name} has been added to the ideas list`,
      });
      router.refresh();
      setIsAddingIdea(false);
    } catch (error) {
      reset();
      // removeEvent(newEvent.id);
      console.error(error);
      setIsAddingIdea(false);
      toast({
        title: 'Error adding event idea',
        description: `Error adding ${data?.ideaName} to the ideas list`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <form className='flex w-full items-center space-x-2' onSubmit={onSubmit}>
      <div className='flex flex-col gap-2 w-full relative'>
        <Input type='text' placeholder='New idea' {...register('ideaName')} />
        {errors?.ideaName && <p className='absolute left-0 top-full'>{errors.ideaName.message}</p>}
        <Input type='hidden' {...register('getTogetherId')} value={getTogetherId} />
      </div>

      <Button type='submit' disabled={isLoading}>
        {isLoading ? <LoaderCircle className='animate-spin' /> : 'Add idea'}
      </Button>
    </form>
  );
};
