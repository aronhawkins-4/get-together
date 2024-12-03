import React from 'react';
import { createClient } from '../utils/supabase/server';

import { UserMenu } from './user-menu';

export const Header = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return;
  }

  const { data: userData } = await supabase.from('users').select().eq('id', user.id).single();
  console.log(userData);

  return (
    <header className='bg-card text-card-foreground shadow-sm py-4 px-8 flex justify-between items-center'>
      <h1 className='text-xl font-bold'>Get Together</h1>
      <div className='flex items-center space-x-4'>
        <div className='flex items-center'>
          <UserMenu user={userData} />
        </div>
      </div>
    </header>
  );
};
