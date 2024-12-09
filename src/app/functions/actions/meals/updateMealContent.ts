'use server';

import { Json } from '@/app/types/supabase.types';
import { createClient } from '@/app/utils/supabase/server';
import { SerializedEditorState } from 'lexical';

export const updateMealContent = async (mealId: string, content: SerializedEditorState | undefined) => {
  if (!mealId) {
    return { data: null, error: new Error('No meal ID provided') };
  }
  if (!content) {
    return { data: null, error: new Error('No content provided') };
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('meals')
    .update({ content: content as unknown as Json })
    .eq('id', mealId)
    .select()
    .single();

  return { data, error };
};
