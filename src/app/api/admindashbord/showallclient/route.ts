import Client from "@/moduls/client";
import DB from '@/app/lib/dbconnect';
import { NextResponse } from "next/server";

DB();

export async function GET() { // Prefix with _ to indicate unused
    try {
        const clients = await Client.find({});
        if (!clients || clients.length === 0) {
            console.log("No clients found");
        }
        console.log(clients);
        return NextResponse.json(
            { success: true, data: clients },
            { status: 200 }
        );
    } catch (error: unknown) { // Use 'unknown' instead of 'any'
        console.error('Error fetching clients:', error);
        if (error instanceof Error) {
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { success: false, error: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}
