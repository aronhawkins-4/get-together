'use client';

import { useRef, useState } from 'react';
import { createOrUpdateMeal } from '../functions/actions/meals/createOrUpdateMeal';
import { useToast } from '@/hooks/use-toast';
// import { Textarea } from '@/app/components/ui/textarea';
import { Editor, LexicalEditor } from './lexical/lexical-editor';

interface MealProps {
  date: Date;
  type: 'breakfast' | 'lunch' | 'dinner';
  getTogether: number;
  content: string | null | undefined;
}

export const Meal = ({ date, type, getTogether, content }: MealProps) => {
  const [mealContent, setMealContent] = useState<string | undefined | null>(content || '');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const handleUpdate = async () => {
    if (!textareaRef.current) return;
    if (textareaRef.current.value !== mealContent) {
      const { data: newMealData, error } = await createOrUpdateMeal({ content: textareaRef.current.value, type, date: date.toISOString().split('T')[0], getTogether });
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
          description: `${type} on ${date.toISOString().split('T')[0]} has been successfully updated`,
        });
      }
    }
  };

  return (
    <div className='flex flex-col gap-2  min-w-32 w-full'>
      <div className='flex gap-2 justify-between'>
        <p className='font-bold'>{type}</p>
      </div>
      <Editor />
      {/* <Textarea className='bg-muted p-2 border border-gray-300 rounded-lg text-sm' defaultValue={mealContent || ''} onBlur={handleUpdate} ref={textareaRef}></Textarea> */}
    </div>
  );
};
