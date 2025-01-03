import { createClient } from './utils/supabase/server';

import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Sidebar } from './components/sidebar';
import { Header } from './components/header';
import Link from 'next/link';
import { CreateGetTogetherDialog } from './components/create-get-together-dialog';
import { redirect } from 'next/navigation';
import { getUser } from './utils/getUser';
// import { redirect } from 'next/navigation';

export default async function Home() {
  const supabase = await createClient();
  const user = await getUser();
  const { data: getTogethers, error } = await supabase.from('get_togethers').select();

  if (error) {
    console.error(JSON.stringify(error));
  }
  if (!user) {
    redirect('/login');
  }
  return (
    <div className='min-h-screenont-[family-name:var(--font-geist-sans)]'>
      <main className='flex h-screen w-full bg-muted'>
        <Sidebar />
        <div className='flex-1 flex flex-col overflow-hidden'>
          <Header />
          <div className='flex-1 overflow-auto p-6 flex flex-col items-end gap-4'>
            <CreateGetTogetherDialog />
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {getTogethers?.map((getTogether) => (
                <Link href={`/get-together/${getTogether.id}`} key={getTogether.id}>
                  <Card>
                    <CardHeader className='flex flex-row items-center justify-between gap-2'>
                      <CardTitle>{getTogether.name}</CardTitle>
                      <div className='text-sm font-medium text-muted-foreground'>
                        {getTogether.from_date?.replaceAll('-', '/').split('/').slice(1).concat(getTogether.from_date?.replaceAll('-', '/').split('/')[0]).join('/')} –{' '}
                        {getTogether.to_date?.replaceAll('-', '/').split('/').slice(1).concat(getTogether.to_date?.replaceAll('-', '/').split('/')[0]).join('/')}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div>Participants: {getTogether.participants?.length || 0 + 1}</div>
                      <div>
                        Location: {getTogether.city}, {getTogether.state}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
