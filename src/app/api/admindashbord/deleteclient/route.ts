import DB from '@/app/lib/dbconnect';
import Client from '@/moduls/client';
import { NextRequest, NextResponse } from 'next/server';
//import { revalidatePath } from 'next/cache';

DB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { id } = reqBody;

        if (!id) {
            return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
        }

        const deletedClient = await Client.findByIdAndDelete(id);

        if (!deletedClient) {
            return NextResponse.json({ success: false, error: "Client not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error deleting client:', error.message);
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        } else {
            console.error('Unexpected error:', error);
            return NextResponse.json({ success: false, error: 'An unexpected error occurred' }, { status: 500 });
        }
    }
}
