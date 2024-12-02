import React from 'react';
import { createClient } from '../utils/supabase/server';

import { UserMenu } from './user-menu';

export const Header = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if (!user) {
  //   return;
  // }
  return (
    <header className='bg-card text-card-foreground shadow-sm py-4 px-16 flex justify-between items-center'>
      <h1 className='text-xl font-bold'>Get Together</h1>
      <div className='flex items-center space-x-4'>
        <div className='flex items-center'>
          <UserMenu user={user} />
        </div>
      </div>
    </header>
  );
};
