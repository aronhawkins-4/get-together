'use server';

import { Database } from '@/app/types/supabase.types';

import { createClient } from '@/app/utils/supabase/server';
import { revalidatePath } from 'next/cache';

interface UpdateVoteProps {
  voteId: number;
  value: Database['public']['Enums']['vote_value'] | null;
}

export const updateVote = async ({ voteId, value }: UpdateVoteProps) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('votes').update({ value }).eq('id', voteId).select().single();
  revalidatePath(`/events`);
  return { data, error };
};
