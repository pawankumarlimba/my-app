import DB from '@/app/lib/dbconnect';
import { UploadImage } from '@/helpers/cloudnary';
import Client from '@/moduls/client';
import bcryptjs from 'bcryptjs';
import { NextResponse, NextRequest } from 'next/server';

interface UploadImageResponse {
  secure_url: string;
}

DB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.formData();
    const email = reqBody.get('email') as string;
    const password = reqBody.get('password');

    if (!email || !password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Email and password must be provided, and password must be a string' },
        { status: 400 }
      );
    }

    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return NextResponse.json(
        { error: 'Client already registered' },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const file = reqBody.get('logo') as File | null;
    let logoUrl = null;

    if (file) {
      try {
        const data = await UploadImage(file, 'designs') as unknown as UploadImageResponse; 
        logoUrl = data.secure_url;
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        return NextResponse.json(
          { error: 'Failed to upload image' },
          { status: 500 }
        );
      }
    }

    const newClient = new Client({
      username: reqBody.get('username') as string,
      email,
      password: hashedPassword,
      logo: logoUrl,
      heading: reqBody.get('heading') as string,
    });

    const savedClient = await newClient.save();

    return NextResponse.json({
      message: 'Client registered successfully',
      success: true,
      savedClient,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error('Error:', error);
      return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
  }
}
