import DB from '@/app/lib/dbconnect';
import Admin from '@/moduls/admin';
import bcryptjs from 'bcryptjs';
import { NextResponse, NextRequest } from 'next/server';

DB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        console.log(reqBody);
        const admin = await Admin.findOne({ email });
        if (admin) {
            return NextResponse.json({ error: "Admin already registered" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newAdmin = new Admin({
            email,
            password: hashedPassword,
        });

        const savedAdmin = await newAdmin.save();
        console.log(savedAdmin);

        return NextResponse.json({
            message: "Admin registered successfully",
            success: true,
            savedAdmin,
        });
    } catch (error: unknown) {
        console.error('Error:', error); 
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}
