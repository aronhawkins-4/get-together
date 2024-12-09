'use client';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import React, { useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';

import { usePathname, useRouter } from 'next/navigation';

import { toast } from '@/hooks/use-toast';
import { LoaderCircle } from 'lucide-react';
import { createEvent } from '../functions/actions/events/createEvent';

interface IdeasFormProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>;
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
export const IdeasForm: React.FC<IdeasFormProps> = ({ setIsOpen, setIsUpdating }) => {
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
    // setIsLoading(true);
    setIsOpen(false);
    setIsUpdating(true);
    const newEvent = {
      end_datetime: null,
      is_idea: true,
      name: data.ideaName,
      start_datetime: null,
      get_together: Number(data.getTogetherId),
    };
    try {
      reset();
      const { data: newEventData, error } = await createEvent({ ...newEvent });
      if (error) {
        throw error;
      }

      toast({
        title: 'New event idea created!',
        description: `${newEventData?.name} has been added to the ideas list`,
      });
      router.refresh();
    } catch (error) {
      reset();
      console.error(error);
      toast({
        title: 'Error adding event idea',
        description: `Error adding ${data?.ideaName} to the ideas list`,
        variant: 'destructive',
      });
    } finally {
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
