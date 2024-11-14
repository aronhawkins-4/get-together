'use client';
import { Button } from '@/components/ui/button';
import { CalendarDays, Home, Settings, Users, Vote } from 'lucide-react';
import React from 'react';

export const Sidebar = () => {
  return (
    <div className='w-16 bg-card text-card-foreground shadow-md flex flex-col items-center py-4 space-y-8'>
      <Button variant='ghost' size='icon' className='rounded-full'>
        <Home className='h-6 w-6' />
      </Button>
      <Button variant='ghost' size='icon' className='rounded-full'>
        <CalendarDays className='h-6 w-6' />
      </Button>
      <Button variant='ghost' size='icon' className='rounded-full'>
        <Vote className='h-6 w-6' />
      </Button>
      <Button variant='ghost' size='icon' className='rounded-full'>
        <Users className='h-6 w-6' />
      </Button>
      <Button variant='ghost' size='icon' className='rounded-full'>
        <Settings className='h-6 w-6' />
      </Button>
    </div>
  );
};
