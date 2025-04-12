import { NextResponse } from 'next/server';
import { addSubscriber } from '@/utils/mongodb';

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

    console.log('Processing email:', email);
    
    // Add subscriber using direct MongoDB connection
    const result = await addSubscriber(email);

    console.log('Successfully added subscriber:', email);
    return NextResponse.json(
      { message: 'Successfully subscribed', id: result.insertedId },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in subscribe route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 