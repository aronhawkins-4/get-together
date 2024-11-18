'use server';

import { createClient } from '@/app/utils/supabase/server';
import { revalidatePath } from 'next/cache';

interface CreateGetTogetherProps {
  name: string;
  state: string;
  city: string;
  from_date: string;
  to_date: string;
}
// TODO: Add validation
export const createGetTogether = async ({ name, state, city, from_date, to_date }: CreateGetTogetherProps) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('get_togethers').insert({ name, state, city, from_date, to_date }).select().single();
  revalidatePath('/');
  return { data, error };
};
