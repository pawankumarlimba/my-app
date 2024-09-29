import DB from '@/app/lib/dbconnect';
import Admin from '@/moduls/admin';
import { NextResponse, NextRequest } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

DB();


interface LoginRequestBody {
    email: string;
    password: string;
}

export async function POST(request: NextRequest) {
    try {
       
        const reqBody: LoginRequestBody = await request.json();
        const { email, password } = reqBody;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return NextResponse.json({
                error: "Admin not signed up"
            }, {
                status: 400
            });
        }

        const validPassword = await bcryptjs.compare(password, admin.password);
        if (!validPassword) {
            return NextResponse.json({
                error: "Password is wrong"
            }, {
                status: 400
            });
        }

        const tokendata = {
            id: admin._id,
            username: admin.username
        };
        const token1 = await jwt.sign(tokendata, process.env.TOKEN!, { expiresIn: '10d' });

        const response = NextResponse.json({
            message: "Logged in successfully",
            success: true
        }, {
            status: 200
        });

        response.cookies.set("token1", token1, {
            httpOnly: true
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
