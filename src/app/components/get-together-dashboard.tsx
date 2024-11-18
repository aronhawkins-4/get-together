import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// import { Progress } from '@/components/ui/progress';

import { Sidebar } from './sidebar';
import { Header } from './header';

import { IdeasList } from './ideas-list';
import { EventsList } from './events-list';
import { createClient } from '../utils/supabase/server';

interface GetTogetherDashboardProps {
  getTogetherId: number;
}

export const GetTogetherDashboard: React.FC<GetTogetherDashboardProps> = async ({ getTogetherId }) => {
  const supabase = await createClient();
  const { data: events, error } = await supabase.from('events').select('*').eq('get_together', getTogetherId);
  const eventIdeas = events?.filter((event) => event.is_idea);
  const scheduledEvents = events?.filter((event) => !event.is_idea);
  if (error) {
    console.error(JSON.stringify(error));
    return;
  }
  return (
    <div className='flex h-screen w-full bg-muted'>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        {/* Header */}
        <Header />

        {/* Content */}
        <div className='flex-1 overflow-auto grid grid-cols-1 md:grid-cols-2 content-start gap-6 p-6'>
          {/* Voting Section */}
          <Card>
            <CardHeader>
              <CardTitle>Event Ideas</CardTitle>
            </CardHeader>
            <CardContent>
              <IdeasList events={eventIdeas || []} />
            </CardContent>
          </Card>

          {/* Calendar Section */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex gap-6'>
                {/* <Calendar mode='single' className='rounded-md border' /> */}
                <div className='flex-1 flex flex-col gap-4'>
                  <EventsList events={scheduledEvents || []} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Participants</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
