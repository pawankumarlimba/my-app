import DB from '@/app/lib/dbconnect';
import { UploadImage } from '@/helpers/cloudnary';
import Client from '@/moduls/client';
import bcryptjs from 'bcryptjs';
import { NextResponse, NextRequest } from 'next/server';

DB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.formData();
    

    const email = reqBody.get('email') as string | null;
    const password = reqBody.get('password') as string | null;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password must be provided' },
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
    let url = '';

    if (file && file instanceof File) {
      
      const data = (await UploadImage(file, 'designs')) as { secure_url: string };
      url = data.secure_url;
      console.log("Uploaded file URL:", url);
    }

    const newClient = new Client({
      username: reqBody.get('username') as string,
      email,
      password: hashedPassword,
      logo: url,
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
