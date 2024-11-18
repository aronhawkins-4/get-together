'use server';

import { createClient } from '@/app/utils/supabase/server';

export const getVotes = async (eventId: number) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('votes').select().eq('event', eventId);
  return { data, error };
};
