import { Sidebar } from './sidebar';
import { Header } from './header';
import { IdeasList } from './ideas-list';
import { EventsList } from './events-list';
import { createClient } from '../utils/supabase/server';
import { addDays, differenceInDays } from 'date-fns';
import { DailyMeals } from './daily-meals';
import { Separator } from '@/app/components/ui/separator';
import { Block } from './block';
import { ParticipantsList } from './participants-list';

interface GetTogetherDashboardProps {
  getTogetherId: number;
}

export const GetTogetherDashboard: React.FC<GetTogetherDashboardProps> = async ({ getTogetherId }) => {
  const supabase = await createClient();
  const { data: getTogether, error: getTogetherError } = await supabase.from('get_togethers').select('*').eq('id', getTogetherId).single();
  if (getTogetherError) {
    console.error(JSON.stringify(getTogetherError));
    return;
  }
  const startDate = getTogether?.from_date;
  const endDate = getTogether?.to_date;
  if (!startDate || !endDate) {
    console.error('No start or end date found');
    return;
  }
  const duration = differenceInDays(new Date(endDate), new Date(startDate));
  const { data: events, error: eventsError } = await supabase.from('events').select('*').eq('get_together', getTogetherId);
  const eventIdeas = events?.filter((event) => event.is_idea);
  const scheduledEvents = events?.filter((event) => !event.is_idea);
  if (eventsError) {
    console.error(JSON.stringify(eventsError));
    return;
  }

  // const {data: participants, error: participantsError} = await supabase.from('users').select().eq('')
  return (
    <div className='flex h-screen w-full bg-muted'>
      <Sidebar />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Header />
        <div className='flex-1 overflow-auto grid grid-cols-1 content-start gap-6 p-6'>
          <Block title='Event Ideas'>
            <IdeasList events={eventIdeas || []} />
          </Block>
          <Block title='Upcoming Events'>
            <div className='flex gap-6'>
              <div className='flex-1 flex flex-col gap-4'>
                <EventsList events={scheduledEvents || []} />
              </div>
            </div>
          </Block>
          <Block title='Meals'>
            <div className='flex flex-col gap-8'>
              {duration &&
                Array.from({ length: duration }).map((_, index) => (
                  <div key={index} className='flex flex-col gap-8'>
                    <DailyMeals key={index} date={addDays(startDate, index)} getTogetherId={getTogetherId} />
                    {index !== duration - 1 && <Separator />}
                  </div>
                ))}
            </div>
          </Block>
          {/* <Block title='Participants'>
                <ParticipantsList />
              </Block> */}
        </div>
      </div>
    </div>
  );
};
