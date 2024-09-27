import DB from '@/app/lib/dbconnect';
import { NextResponse, NextRequest } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Client from '@/moduls/client';

DB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, password } = reqBody;

        console.log(reqBody);

        const client = await Client.findOne({ username });
        if (!client) {
            return NextResponse.json({
                error: "Admin not signed up",
            }, {
                status: 400,
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
            success: true, // Fixed typo: changed "succuss" to "success"
        }, {
            status: 200,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;

    } catch (error: unknown) { // Change 'any' to 'unknown'
        if (error instanceof Error) {
            return NextResponse.json({
                error: error.message,
            }, {
                status: 500,
            });
        } else {
            return NextResponse.json({
                error: 'An unexpected error occurred',
            }, {
                status: 500,
            });
        }
    }
}
