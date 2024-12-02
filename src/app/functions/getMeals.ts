import { createClient } from '../utils/supabase/server';

export const getMeals = async (date: Date, getTogetherId: number) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('meals').select().eq('get_together', getTogetherId).eq('date', date.toISOString().split('T')[0]);
  if (error) {
    console.log(error);
    return undefined;
  }
  return data;
};
