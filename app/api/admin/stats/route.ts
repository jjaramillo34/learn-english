import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const DB_NAME = 'learn-english';
const COLLECTION_NAME = 'users';

export async function GET(request: NextRequest) {
  try {
    // In a real app, you'd verify the admin session here
    // For now, we'll rely on client-side session management
    
    if (!clientPromise) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Get total user count
    const totalUsers = await collection.countDocuments({ role: { $ne: 'admin' } });

    // Get users with their progress
    const users = await collection.find(
      { role: { $ne: 'admin' } },
      { projection: { password: 0 } } // Exclude passwords
    ).toArray();

    // Calculate statistics
    const stats = {
      totalUsers,
      totalLearnedCards: 0,
      usersWithProgress: 0,
      averageLearnedCards: 0,
      usersByLanguage: {} as Record<string, number>,
      recentlyActive: 0, // Users active in last 7 days
    };

    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    users.forEach((user: any) => {
      const learnedCount = user.learnedCards?.length || 0;
      stats.totalLearnedCards += learnedCount;
      
      if (learnedCount > 0) {
        stats.usersWithProgress++;
      }

      const language = user.currentLanguage || 'unknown';
      stats.usersByLanguage[language] = (stats.usersByLanguage[language] || 0) + 1;

      const updatedAt = user.updatedAt ? new Date(user.updatedAt) : null;
      if (updatedAt && updatedAt >= sevenDaysAgo) {
        stats.recentlyActive++;
      }
    });

    stats.averageLearnedCards = stats.totalUsers > 0 
      ? Math.round(stats.totalLearnedCards / stats.totalUsers) 
      : 0;

    // Get detailed user list (limit to last 100 for performance)
    const recentUsers = await collection.find(
      { role: { $ne: 'admin' } },
      { 
        projection: { password: 0 },
        sort: { updatedAt: -1 },
        limit: 100
      }
    ).toArray();

    return NextResponse.json({ 
      stats,
      recentUsers: recentUsers.map((user: any) => ({
        _id: user._id.toString(),
        username: user.username,
        learnedCardsCount: user.learnedCards?.length || 0,
        currentLanguage: user.currentLanguage || 'none',
        selectedCategories: user.selectedCategories || [],
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }))
    }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}

