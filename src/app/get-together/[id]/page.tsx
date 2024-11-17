import { EventPlanner } from '@/app/components/event-planner';
import React from 'react';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  console.log(id);
  return (
    <div className='min-h-screenont-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <EventPlanner />
      </main>
    </div>
  );
}
