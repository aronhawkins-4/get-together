'use server';

import { Database } from '@/app/types/supabase.types';
import { getUser } from '@/app/utils/getUser';
import { createClient } from '@/app/utils/supabase/server';
import { revalidatePath } from 'next/cache';

interface CreateVoteProps {
  eventId: number;
  value: Database['public']['Enums']['vote_value'];
}

export const createVote = async ({ eventId, value }: CreateVoteProps) => {
  const supabase = await createClient();
  const user = await getUser();
  if (!user) {
    throw new Error('User not found');
  }
  const { data, error } = await supabase.from('votes').insert({ event: eventId, value, user: user.id }).select().single();
  revalidatePath(`/events/${eventId}`);
  return { data, error };
};
