import { NextResponse } from 'next/server';
import clientPromise from '@/utils/mongodb';

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
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("covolabs");
    
    // Add to subscribers collection
    await db.collection("subscribers").insertOne({
      email,
      timestamp: new Date()
    });

    console.log('Successfully added subscriber:', email);
    return NextResponse.json(
      { message: 'Successfully subscribed' },
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