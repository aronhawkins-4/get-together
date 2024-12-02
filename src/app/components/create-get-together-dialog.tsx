'use client';
import { Button } from '@/app/components/ui/button';
import { Calendar } from '@/app/components/ui/calendar';
import { DialogHeader, Dialog, DialogContent, DialogTitle } from '@/app/components/ui/dialog';

import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { LoaderCircle, Plus } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Resolver, useForm } from 'react-hook-form';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { US_STATES } from '../utils/us-states';

import { US_CITIES } from '../utils/us-cities';

import { useRouter } from 'next/navigation';
import { createGetTogether } from '../functions/actions/get-togethers/createGetTogether';

interface CreateGetTogetherDialogProps {}
type CreateGetTogetherFormValues = {
  name: string;
  state: string;
  city: string;
  fromDate: Date;
  toDate: Date;
};

const resolver: Resolver<CreateGetTogetherFormValues> = async (values) => {
  return {
    values: values.name ? values : {},
    errors: !values.name
      ? {
          name: {
            type: 'required',
            message: 'This is required.',
          },
        }
      : !values.fromDate || !values.toDate
      ? {
          fromDate: {
            type: 'required',
            message: 'From Date and to Date are required.',
          },
          toDate: {
            type: 'required',
            message: 'From Date and to Date are required.',
          },
        }
      : {},
  };
};

export const CreateGetTogetherDialog: React.FC<CreateGetTogetherDialogProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedDates, setSelectedDates] = useState<DateRange | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // const { updateEvent } = useEventsStore();
  // const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateGetTogetherFormValues>({ resolver });
  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      const { data: getTogether, error } = await createGetTogether({
        name: data.name,
        state: data.state,
        city: data.city,
        from_date: data.fromDate.toISOString().split('T')[0],
        to_date: data.toDate.toISOString().split('T')[0],
      });

      if (error) {
        throw error;
      }
      if (!getTogether) {
        throw new Error('Get Together not created');
      }

      setIsLoading(false);
      setIsOpen(false);
      toast({
        title: 'Get Together created successfully',
      });
      router.push(`/get-together/${getTogether.id}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      setIsLoading(false);
      toast({
        title: 'Error creating get together',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  const handleSelectDates = (d: DateRange | undefined) => {
    setSelectedDates(d);
    if (d?.from) setValue('fromDate', d.from);
    if (d?.to) setValue('toDate', d.to);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button size={'default'} className='w-fit' variant={'outline'} onClick={() => setIsOpen(true)}>
        Create
        <Plus className='w-4 ml-2' />
      </Button>
      <DialogContent className='bg-primary-foreground max-w-2xl w-fit'>
        <DialogHeader className='text-primary'>
          <DialogTitle>Create Get Together</DialogTitle>
        </DialogHeader>
        <form className='flex gap-6 text-primary'>
          <div className='flex flex-col gap-2'>
            <Label>Dates</Label>
            <Calendar className='text-primary p-0' mode='range' selected={selectedDates} onSelect={(d) => handleSelectDates(d)} />
            {(errors?.fromDate || errors?.toDate) && <p className='text-destructive'>{errors.fromDate?.message}</p>}
          </div>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='name'>Get Together Name</Label>
              <Input {...register('name')} id='name' placeholder='Family Trip' className='text-primary' />

              {errors?.name && <p className='text-destructive'>{errors.name.message}</p>}
            </div>

            <div className='flex gap-2'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='state' className='text-primary'>
                  State
                </Label>
                <Select name='state' onValueChange={(value) => setValue('state', value)}>
                  <SelectTrigger className='w-full min-w-36 flex-1'>
                    <SelectValue placeholder='Select a state' />
                  </SelectTrigger>
                  <SelectContent>
                    {US_STATES.map((state) => (
                      <SelectItem key={state.code} value={state.code}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='city' className='text-primary'>
                  City
                </Label>
                <Select name='city' onValueChange={(value) => setValue('city', value)}>
                  <SelectTrigger className='w-full min-w-36 flex-1'>
                    <SelectValue placeholder='Select a state' id='city' />
                  </SelectTrigger>
                  <SelectContent>
                    {US_CITIES.filter((city) => city.stateCode === watch('state')).map((city) => (
                      <SelectItem key={city.name} value={city.name}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={onSubmit} disabled={isLoading}>
              {isLoading ? <LoaderCircle className='w-4 h-4 animate-spin' /> : 'Create Get Together'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
