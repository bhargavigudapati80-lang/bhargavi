// File: /app/api/genkit/[...slug]/route.js
import { NextResponse } from 'next/server';

// Catch all API route handler
export async function GET(req, { params }) {
  try {
    const { slug } = params; // slug is an array, because of [...slug]
    
    // Example: return the slug back as JSON
    return NextResponse.json({
      message: 'API working!',
      slug: slug,
    });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

// Optional: POST handler
export async function POST(req, { params }) {
  try {
    const body = await req.json();
    return NextResponse.json({
      message: 'POST received!',
      body,
      slug: params.slug,
    });
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
