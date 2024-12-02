'use server';

import { createClient } from '@/app/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export const deleteVote = async (voteId: number) => {
  const supabase = await createClient();
  const { error } = await supabase.from('votes').delete().eq('id', voteId);
  revalidatePath(`/events`);
  return { error };
};
