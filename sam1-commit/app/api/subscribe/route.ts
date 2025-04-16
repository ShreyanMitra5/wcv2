import { NextResponse } from 'next/server';
import { appendToCsv } from '@/utils/csv';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received request body:', body);
    const { email } = body;

    if (!email) {
      console.log('No email provided');
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!process.env.MONGODB_URI) {
      console.error('MongoDB URI is not configured');
      return NextResponse.json(
        { error: 'Database configuration error' },
        { status: 500 }
      );
    }

    console.log('Processing email:', email);
    
    // Add subscriber using direct MongoDB connection
    const result = appendToCsv(email);

    console.log('Successfully added subscriber:', email);
    return NextResponse.json(
      { message: 'Successfully subscribed' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in subscribe route:', error);
    // Return a more user-friendly error message
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}