'use client';

import { useRef, useState } from 'react';
import { createOrUpdateMeal } from '../functions/actions/meals/createOrUpdateMeal';
import { useToast } from '@/hooks/use-toast';
// import { Textarea } from '@/app/components/ui/textarea';
import { Editor } from './lexical/lexical-editor';
import { Json, Tables } from '../types/supabase.types';

interface MealProps {
  meal: Tables<'meals'>;
}

export const Meal = ({ meal }: MealProps) => {
  const [mealContent, setMealContent] = useState<Json | string | undefined | null>(meal.content || '');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const handleUpdate = async () => {
    if (!textareaRef.current) return;
    if (textareaRef.current.value !== mealContent) {
      const { data: newMealData, error } = await createOrUpdateMeal({
        content: textareaRef.current.value,
        type: meal.type || undefined,
        date: meal.date || '',
        getTogether: meal.get_together || undefined,
      });
      if (error) {
        console.log(error);
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        setMealContent(newMealData?.content?.toString());
        toast({
          title: 'Meal updated',
          description: `${meal.type} on ${meal.date} has been successfully updated`,
        });
      }
    }
  };

  return (
    <div className='flex flex-col gap-2  min-w-32 w-full'>
      <div className='flex gap-2 justify-between'>
        <p className='font-bold'>{meal.type}</p>
      </div>
      <Editor mealId={meal.id} content={meal.content} />
      {/* <Textarea className='bg-muted p-2 border border-gray-300 rounded-lg text-sm' defaultValue={mealContent || ''} onBlur={handleUpdate} ref={textareaRef}></Textarea> */}
    </div>
  );
};
