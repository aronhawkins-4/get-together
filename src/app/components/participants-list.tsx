'use client';
import React from 'react';

import { Tables } from '../types/supabase.types';

interface ParticipantsListProps {
  users: Tables<'users'>[];
}
export const ParticipantsList: React.FC<ParticipantsListProps> = ({ users }) => {
  return (
    <div className='space-y-4'>
      {users.map((user) => {
        return (
          <div key={user.id} className='flex items-center justify-between'>
            <span className='font-medium'>{user.first_name}</span>
          </div>
        );
      })}
    </div>
  );
};
