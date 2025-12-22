import { NextResponse } from 'next/server';

export async function POST() {
    try {
        // This endpoint will be called to signal cache refresh
        // The actual cache clearing happens on the client side
        return NextResponse.json({
            success: true,
            message: "Cache cleared successfully"
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: "Failed to clear cache"
        }, { status: 500 });
    }
}
