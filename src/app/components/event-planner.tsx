import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
// import { Progress } from '@/components/ui/progress';

import { Sidebar } from './sidebar';
import { Header } from './header';

import { IdeasList } from './ideas-list';
import { EventsList } from './events-list';

export const EventPlanner = () => {
  // const activities = [
  //   { id: 1, name: 'Hiking', votes: 8, total: 10 },
  //   { id: 2, name: 'Beach Day', votes: 6, total: 10 },
  //   { id: 3, name: 'Movie Night', votes: 4, total: 10 },
  // ];

  return (
    <div className='flex h-screen w-full bg-muted'>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        {/* Header */}
        <Header />

        {/* Content */}
        <main className='flex-1 overflow-auto p-6 space-y-6'>
          {/* Voting Section */}
          <Card>
            <CardHeader>
              <CardTitle>Vote on Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <IdeasList />
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
                  <EventsList />
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};
