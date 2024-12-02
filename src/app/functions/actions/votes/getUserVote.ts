'use server';

import { getUser } from '@/app/utils/getUser';
import { createClient } from '@/app/utils/supabase/server';

export const getUserVote = async (eventId: number) => {
  const supabase = await createClient();
  const user = await getUser();
  if (!user) {
    throw new Error('User not found');
  }
  const { data, error } = await supabase.from('votes').select().eq('event', eventId).eq('user', user.id).single();
  return { data, error };
};
