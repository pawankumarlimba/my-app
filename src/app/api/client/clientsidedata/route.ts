import Message1 from "@/moduls/message";
import DB from '@/app/lib/dbconnect';
import { NextResponse, NextRequest } from 'next/server';
import { getDataFromToken } from "@/helpers/tokendata";
import Client from "@/moduls/client";

DB();

export async function GET(request: NextRequest) {
  try {
    const adminId = await getDataFromToken(request);

    const client = await Client.findById(adminId);
    if (!client) {
      return NextResponse.json({
        error: "Client not found",
        success: false,
      }, {
        status: 404,
      });
    }

    const username = client.username;
    const messages = await Message1.find({ username });

    return NextResponse.json({
      messages,
      success: true,
    }, {
      status: 200,
    });

  } catch (error: unknown) {
    console.error('Error fetching messages:', error); // Optional: Log for debugging
    if (error instanceof Error) {
      return NextResponse.json({
        error: error.message,
        success: false,
      }, {
        status: 500,
      });
    }
    return NextResponse.json({
      error: 'An unexpected error occurred',
      success: false,
    }, {
      status: 500,
    });
  }
}
