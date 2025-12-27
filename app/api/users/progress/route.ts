import { NextRequest, NextResponse } from 'next/server';
import { toggleCardLearned } from '@/lib/models/User';

export async function POST(request: NextRequest) {
  try {
    const { username, cardId, learned } = await request.json();

    if (!username || !cardId || typeof learned !== 'boolean') {
      return NextResponse.json(
        { error: 'Username, cardId, and learned status are required' },
        { status: 400 }
      );
    }

    const user = await toggleCardLearned(username, cardId, learned);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating card progress:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update progress' },
      { status: 500 }
    );
  }
}

