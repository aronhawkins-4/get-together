import { Database } from '../types/supabase.types';
import { Meal } from './meal';
import { getMeals } from '../functions/getMeals';

interface DailyMealsProps {
  date: Date;
  getTogetherId: number;
}

export const DailyMeals = async ({ date, getTogetherId }: DailyMealsProps) => {
  const getMealContent = (meals: Database['public']['Tables']['meals']['Row'][], date: Date, type: Database['public']['Enums']['meal_type']) => {
    const content = (meals.find((meal) => new Date(meal.date || '').getTime() === date.getTime() && meal.type?.toLowerCase() === type?.toLowerCase())?.content as string | undefined) || '';
    return content;
  };
  const meals = await getMeals(date, getTogetherId);
  if (!meals) return;
  return (
    <div>
      <h3 className=' font-semibold'>{date.toLocaleDateString()}</h3>
      <div className='flex gap-8'>
        <Meal date={date} type='breakfast' getTogether={getTogetherId} content={getMealContent(meals, date, 'breakfast')} />
        <Meal date={date} type='lunch' getTogether={getTogetherId} content={getMealContent(meals, date, 'lunch')} />
        <Meal date={date} type='dinner' getTogether={getTogetherId} content={getMealContent(meals, date, 'dinner')} />
      </div>
    </div>
  );
};
