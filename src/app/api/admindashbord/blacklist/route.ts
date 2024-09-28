import DB from '@/app/lib/dbconnect';
import Client from '@/moduls/client';
import { NextRequest, NextResponse } from 'next/server';

DB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { id } = reqBody;

        if (!id) {
            return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
        }

        const response = await Client.findById(id);  
        
        if (!response) {
            return NextResponse.json({ success: false, error: "Client not found" }, { status: 404 });
        }

        response.isBlacklisted = true;
        
        await response.save();  

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error blacklisting client:', error.message);
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        } else {
            console.error('Unexpected error:', error);
            return NextResponse.json({ success: false, error: 'An unexpected error occurred' }, { status: 500 });
        }
    }
}
