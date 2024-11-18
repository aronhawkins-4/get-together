'use server';

import { createClient } from '@/app/utils/supabase/server';
import { revalidatePath } from 'next/cache';

interface CreateEventProps {
  end_datetime: string | null;
  is_idea: boolean;
  name: string;
  start_datetime: string | null;
  get_together: number;
}
// TODO: Add validation
export const createEvent = async ({ end_datetime, is_idea, name, start_datetime, get_together }: CreateEventProps) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('events').insert({ end_datetime, is_idea, name, start_datetime, get_together }).select().single();
  revalidatePath('/get_together/[id]');
  return { data, error };
};
