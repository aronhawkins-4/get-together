import { createClient } from '@/app/utils/supabase/server';
import { NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(request: Request, { params }: { params: any }) {
  const supabase = await createClient();
  const loadedParams = await params;
  const getTogetherId = await loadedParams.getTogetherId;
  const date = await loadedParams.date;

  if (!getTogetherId || !date) {
    return NextResponse.json({ error: 'Missing getTogetherId or date', data: null }, { status: 400 });
  }

  const { data, error } = await supabase.from('meals').select().eq('get_together', getTogetherId).eq('date', date);

  if (error) {
    return NextResponse.json({ error: error.message, data: null }, { status: 500 });
  }

  return NextResponse.json({ data: data, error: null }, { status: 200 });
}
