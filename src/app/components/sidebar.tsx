'use client';
import { Button } from '@/app/components/ui/button';
import { CalendarDays, Home, Settings, Vote } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const Sidebar = () => {
  return (
    <div className='w-16 bg-card text-card-foreground shadow-md flex flex-col items-center py-4 space-y-8'>
      <Button variant='ghost' size='icon' className='rounded-full' asChild>
        <Link href='/'>
          <Home className='h-6 w-6' />
        </Link>
      </Button>
      <Button variant='ghost' size='icon' className='rounded-full'>
        <CalendarDays className='h-6 w-6' />
      </Button>
      <Button variant='ghost' size='icon' className='rounded-full'>
        <Vote className='h-6 w-6' />
      </Button>
      <Button variant='ghost' size='icon' className='rounded-full'>
        <Settings className='h-6 w-6' />
      </Button>
    </div>
  );
};
