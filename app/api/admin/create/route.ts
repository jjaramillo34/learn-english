import { NextRequest, NextResponse } from 'next/server';
import { getUserByUsername, updateUserProgress } from '@/lib/models/User';
import bcrypt from 'bcryptjs';

// This endpoint creates an admin user
// In production, you should protect this endpoint or create admins manually
export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Check if user exists
    let user = await getUserByUsername(username);
    
    if (user && user.role === 'admin') {
      return NextResponse.json(
        { error: 'Admin user already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    if (user) {
      // Update existing user to admin
      const updatedUser = await updateUserProgress(username, {
        role: 'admin',
        password: hashedPassword,
      } as any);
      
      if (!updatedUser) {
        return NextResponse.json(
          { error: 'Failed to update user' },
          { status: 500 }
        );
      }

      const { password: _, ...userWithoutPassword } = updatedUser;
      return NextResponse.json({ 
        success: true, 
        user: userWithoutPassword 
      }, { status: 200 });
    } else {
      // Create new admin user
      const { createUser } = await import('@/lib/models/User');
      const newUser = await createUser(username);
      
      // Update to admin with password
      const updatedUser = await updateUserProgress(username, {
        role: 'admin',
        password: hashedPassword,
      } as any);

      if (!updatedUser) {
        return NextResponse.json(
          { error: 'Failed to create admin user' },
          { status: 500 }
        );
      }

      const { password: _, ...userWithoutPassword } = updatedUser;
      return NextResponse.json({ 
        success: true, 
        user: userWithoutPassword 
      }, { status: 201 });
    }
  } catch (error: any) {
    console.error('Error creating admin:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create admin' },
      { status: 500 }
    );
  }
}

