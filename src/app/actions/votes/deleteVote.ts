'use server';

import { createClient } from '@/app/utils/supabase/server';

export const deleteVote = async (voteId: number) => {
  const supabase = await createClient();
  const { error } = await supabase.from('votes').delete().eq('id', voteId);
  return { error };
};
