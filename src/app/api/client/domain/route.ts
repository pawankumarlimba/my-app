import DB from '@/app/lib/dbconnect';
import { NextResponse, NextRequest } from 'next/server';
import Client from '@/moduls/client';

DB();


interface RequestBody {
    username: string;
}

export async function POST(request: NextRequest) {
    try {
        const reqBody: RequestBody = await request.json(); 
        const { username } = reqBody;

        if (!username) {
            return NextResponse.json(
                {
                    message: 'Username is required',
                    success: false,
                },
                { status: 400 }
            );
        }
//console.log(username);
        const client = await Client.findOne({ username }).select('-password');

        if (!client) {
            return NextResponse.json(
                {
                    message: 'Client not found',
                    success: false,
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: 'Client found',
                data: client,
                success: true,
            },
            { status: 200 }
        );
    } catch (error: unknown) { 
        if (error instanceof Error) {
            return NextResponse.json(
                {
                    error: error.message,
                },
                { status: 500 }
            );
        } else {
            return NextResponse.json(
                {
                    error: 'An unexpected error occurred',
                },
                { status: 500 }
            );
        }
    }
}
