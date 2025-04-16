import { NextResponse } from 'next/server';
import { getSubscribers } from '@/utils/csv';

export async function GET() {
  const data = getSubscribers();
  return NextResponse.json(data);
}