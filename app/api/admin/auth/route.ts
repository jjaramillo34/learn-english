import { NextRequest, NextResponse } from 'next/server';
import { getUserByUsername } from '@/lib/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const user = await getUserByUsername(username);
    
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    if (!user.password) {
      return NextResponse.json(
        { error: 'Admin account not properly configured' },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Return success without password
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json({ 
      success: true, 
      user: userWithoutPassword 
    }, { status: 200 });
  } catch (error: any) {
    console.error('Error authenticating admin:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to authenticate' },
      { status: 500 }
    );
  }
}

