import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import State from '@/models/State';

export async function GET() {
    await dbConnect();
    try {
        const states = await State.find({});
        return NextResponse.json(states);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch states' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        const state = await State.create(body);
        return NextResponse.json(state, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create state' }, { status: 500 });
    }
}
