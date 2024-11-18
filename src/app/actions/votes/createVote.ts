'use server';

import { Database } from '@/app/types/supabase.types';
import { createClient } from '@/app/utils/supabase/server';

interface CreateVoteProps {
  eventId: number;
  value: Database['public']['Enums']['vote_value'];
}

export const createVote = async ({ eventId, value }: CreateVoteProps) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('votes').insert({ event: eventId, value }).select().single();
  return { data, error };
};
