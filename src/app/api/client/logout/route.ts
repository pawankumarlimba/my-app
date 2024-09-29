import DB from '@/app/lib/dbconnect';
import { NextResponse } from 'next/server';

DB();

export async function POST() { 
    try {
       
        const response = NextResponse.json({
            message: "Logout successfully",
            success: true,
        });

        
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        return response; 
    } catch (error: unknown) { 
        if (error instanceof Error) {
            return NextResponse.json({
                error: error.message 
            }, {
                status: 500 
            });
        } else {
            return NextResponse.json({
                error: 'An unexpected error occurred' 
            }, {
                status: 500
            });
        }
    }
}
