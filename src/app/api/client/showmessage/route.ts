import DB from '@/app/lib/dbconnect';
import Message1 from '@/moduls/message';
import { NextResponse, NextRequest } from 'next/server';
import { sendEmail } from '@/helpers/mailer';
import Client from '@/moduls/client';

DB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, name, email, message } = reqBody;

    console.log(message);

    const newMessage = new Message1({
      email,
      username,
      name,
      message,
    });

    const response = await Client.findOne({ username });
    if (!response) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }
    
    const savedMessage = await newMessage.save();
    console.log(savedMessage);

    await sendEmail({ email: response.email, useremail: email, username: name, message });
    response.totalform += 1;
    await response.save();

    return NextResponse.json({
      success: true,
      savedMessage,
    });

  } catch (error: unknown) { 
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: 'An unknown error occurred' }, 
        { status: 500 }
      );
    }
  }
}
