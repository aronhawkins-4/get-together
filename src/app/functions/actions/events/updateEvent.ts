'use server';

import { Tables } from '@/app/types/supabase.types';
import { createClient } from '@/app/utils/supabase/server';
import { revalidatePath } from 'next/cache';

// TODO: Add validation
export const updateEvent = async (event: Tables<'events'>) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('events').update(event).eq('id', event.id).select().single();
  revalidatePath('/get_together/[id]');
  return { data, error };
};
