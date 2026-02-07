import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Destination from '@/models/Destination';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(request: Request, context: any) {
    await dbConnect();
    const { id } = await context.params;
    try {
        const destination = await Destination.findById(id).populate('state');
        if (!destination) {
            return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
        }
        return NextResponse.json(destination);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch destination' }, { status: 500 });
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DELETE(request: Request, context: any) {
    await dbConnect();
    const { id } = await context.params;
    try {
        const deleted = await Destination.findByIdAndDelete(id);
        if (!deleted) {
            return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Destination deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete destination' }, { status: 500 });
    }
}
