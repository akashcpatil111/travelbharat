import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Destination from '@/models/Destination';

export async function GET(request: Request) {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const stateId = searchParams.get('stateId');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};

    if (stateId) query.state = stateId;
    if (category) query.category = category;
    if (featured === 'true') query.isFeatured = true;
    if (search) {
        query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { city: { $regex: search, $options: 'i' } },
        ];
    }

    try {
        const destinations = await Destination.find(query).populate('state');
        return NextResponse.json(destinations);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch destinations' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        const destination = await Destination.create(body);
        return NextResponse.json(destination, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create destination' }, { status: 500 });
    }
}
