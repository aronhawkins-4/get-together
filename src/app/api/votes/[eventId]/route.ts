import { createClient } from '@/app/utils/supabase/server';
import { NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(request: Request, { params }: { params: any }) {
  const supabase = await createClient();
  const eventId = await params.eventId;
  const eventIdInt = parseInt(eventId);

  const { data, error } = await supabase.from('votes').select().eq('event', eventIdInt);

  if (error) {
    return NextResponse.json({ error: error.message, data: null }, { status: 500 });
  }

  return NextResponse.json({ data: data, error: null }, { status: 200 });
}
