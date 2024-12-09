import { Meal } from './meal';
import { getMeals } from '../functions/getMeals';

interface DailyMealsProps {
  date: Date;
  getTogetherId: number;
}

export const DailyMeals = async ({ date, getTogetherId }: DailyMealsProps) => {
  const meals = await getMeals(date, getTogetherId);
  const sortedMeals = meals?.sort((a, b) => {
    if (a.type && b.type) {
      const map = {
        breakfast: 1,
        lunch: 2,
        dinner: 3,
      };
      if (map[a.type] < map[b.type]) {
        return -1;
      }
      if (map[a.type] > map[b.type]) {
        return 1;
      }
    }
    return 0;
  });
  if (!sortedMeals) return;
  return (
    <div>
      <h3 className=' font-semibold'>{date.toLocaleDateString()}</h3>
      <div className='flex gap-8'>
        {sortedMeals &&
          sortedMeals.map((meal) => {
            return <Meal key={meal.id} meal={meal} />;
          })}
      </div>
    </div>
  );
};
