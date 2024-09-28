// Import necessary modules
import DB from '@/app/lib/dbconnect';
import { NextResponse, NextRequest } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Client from '@/moduls/client';

// Initialize DB connection
DB();

// Define POST handler for login
export async function POST(request: NextRequest) {
    try {
        // Parse request body
        const reqBody = await request.json();
        const { username, password } = reqBody;

        // Log request body for debugging purposes
        console.log(reqBody);

        // Fetch client details based on the username
        const client = await Client.findOne({ username });
        if (!client) {
            return NextResponse.json({
                error: "Admin not signed up",
            }, {
                status: 400,
            });
        }

        
        if (client.isBlacklisted) {
           
            return NextResponse.json({
                error: "Client is blacklisted",
            }, {
                status: 403, 
            });
        }

        
        const validPassword = await bcryptjs.compare(password, client.password);
        if (!validPassword) {
            return NextResponse.json({
                error: "Password is wrong",
            }, {
                status: 400,
            });
        }

        
        const tokenData = {
            id: client._id,
            username: client.username,
        };
        const token = await jwt.sign(tokenData, process.env.TOKEN!, { expiresIn: '10d' });

    
        const response = NextResponse.json({
            message: "Logged in successfully",
            success: true, 
        }, {
            status: 200,
        });

        
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict',
        });

        return response;

    } catch (error: unknown) {
       
        if (error instanceof Error) {
            return NextResponse.json({
                error: error.message,
            }, {
                status: 500,
            });
        } 
      
        return NextResponse.json({
            error: 'An unexpected error occurred',
        }, {
            status: 500,
        });
    }
}
