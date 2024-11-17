import React from 'react';
import { createClient } from '../utils/supabase/server';
import { CircleUserRound } from 'lucide-react';

export const Header = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // if (!user) {
  //   return;
  // }
  return (
    <header className='bg-card text-card-foreground shadow-sm p-4 flex justify-between items-center'>
      <h1 className='text-xl font-bold'>Get Together</h1>
      <div className='flex items-center space-x-4'>
        <span>{user?.email}</span>
        <div className='w-6 h-6 rounded-full'>
          <CircleUserRound className='w-full h-full' />
        </div>
      </div>
    </header>
  );
};
