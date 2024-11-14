import { createClient } from './utils/supabase/server';
import { EventPlanner } from './components/event-planner';
// import { redirect } from 'next/navigation';

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // redirect('/login');
  }
  return (
    <div className='min-h-screenont-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <EventPlanner />
      </main>
    </div>
  );
}
