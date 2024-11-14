import React from 'react';
import { createClient } from '../utils/supabase/server';

export const Header = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return;
  }
  return (
    <header className='bg-card text-card-foreground shadow-sm p-4 flex justify-between items-center'>
      <h1 className='text-2xl font-bold'>Group Event Planner</h1>
      <div className='flex items-center space-x-4'>
        <span>{user.email}</span>
        <div className='w-10 h-10  rounded-full'></div>
      </div>
    </header>
  );
};
