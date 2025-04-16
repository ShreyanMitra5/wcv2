import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const WAITLIST_FILE = path.join(process.cwd(), 'data', 'waitlist.json');
    const data = JSON.parse(fs.readFileSync(WAITLIST_FILE, 'utf-8'));
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch waitlist data' },
      { status: 500 }
    );
  }
} 