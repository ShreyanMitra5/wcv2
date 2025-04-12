import { NextResponse } from 'next/server';
import { getSubscribers } from '@/utils/mongodb';

export async function GET() {
  try {
    const data = await getSubscribers();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error getting subscribers:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 