'use server';

import { createClient } from '@/app/utils/supabase/server';
import { revalidatePath } from 'next/cache';

// TODO: Add validation
export const deleteEvent = async (id: number) => {
  const supabase = await createClient();
  const { error } = await supabase.from('events').delete().eq('id', id);
  revalidatePath('/get_together/[id]');
  return { error };
};
