import { GetTogetherDashboard } from '@/app/components/get-together-dashboard';
import { createClient } from '@/app/utils/supabase/server';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: getTogetherData, error } = await supabase.from('get_togethers').select('id').eq('id', id).single();
  if (error || !getTogetherData) {
    console.error(JSON.stringify(error));
    notFound();
  }

  return (
    <div className='min-h-screenont-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <GetTogetherDashboard getTogetherId={getTogetherData.id} />
      </main>
    </div>
  );
}
