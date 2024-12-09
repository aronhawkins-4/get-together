'use server';

import { Database } from '@/app/types/supabase.types';
import { createClient } from '@/app/utils/supabase/server';
import { revalidatePath } from 'next/cache';

interface CreateMealProps {
  content: string;
  type: Database['public']['Enums']['meal_type'] | undefined;
  date: string;
  getTogether: number | undefined;
}
// TODO: Add validation
export const createOrUpdateMeal = async ({ content, type, date, getTogether }: CreateMealProps) => {
  if (!getTogether) {
    throw new Error('No Get Together ID');
  }
  if (!type) {
    throw new Error('No Meal Type');
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User not found');
  }
  const { data: existingMeals, error: existingMealsError } = await supabase.from('meals').select('id').eq('get_together', getTogether).eq('type', type).eq('date', date);
  if (existingMealsError) {
    console.log('error');
    console.log(existingMealsError);
    return { existingMeals, existingMealsError };
  }
  if (existingMeals[0]) {
    const { data, error } = await supabase.from('meals').update({ content }).eq('id', existingMeals[0].id).eq('type', type).eq('date', date).select().single();
    revalidatePath(`/get-together/${getTogether}`);
    return { data, error };
  }
  const { data, error } = await supabase.from('meals').insert({ content, type, date, get_together: getTogether }).select().single();
  revalidatePath(`/get-together/${getTogether}`);
  return { data, error };
};
