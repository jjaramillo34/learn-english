import clientPromise from '../mongodb';

export interface UserProgress {
  cardId: string;
  learned: boolean;
  lastReviewed?: Date;
}

export interface User {
  _id?: string;
  username: string;
  learnedCards: string[]; // Array of card IDs that are learned
  createdAt: Date;
  updatedAt: Date;
  currentLanguage?: string;
  currentIndex?: number;
  selectedCategories?: string[]; // Selected categories to study
  role?: 'user' | 'admin'; // User role, defaults to 'user'
  password?: string; // Hashed password for admin users
}

const DB_NAME = 'learn-english';
const COLLECTION_NAME = 'users';

export async function createUser(username: string): Promise<User> {
  if (!clientPromise) {
    // Return mock user if MongoDB is not configured
    return {
      username: username.toLowerCase(),
      learnedCards: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      role: 'user',
    };
  }

  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection<User>(COLLECTION_NAME);

  // Check if user already exists
  const existingUser = await collection.findOne({ username: username.toLowerCase() });
  if (existingUser) {
    throw new Error('Username already exists');
  }

  const newUser: User = {
    username: username.toLowerCase(),
    learnedCards: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    role: 'user',
  };

  const result = await collection.insertOne(newUser);
  return {
    ...newUser,
    _id: result.insertedId.toString(),
  };
}

export async function getUserByUsername(username: string): Promise<User | null> {
  if (!clientPromise) {
    return null;
  }

  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection<User>(COLLECTION_NAME);

  const user = await collection.findOne({ username: username.toLowerCase() });
  if (user) {
    return {
      ...user,
      _id: user._id?.toString(),
    };
  }
  return null;
}

export async function getUserById(id: string): Promise<User | null> {
  if (!clientPromise) {
    return null;
  }

  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection<User>(COLLECTION_NAME);

  const { ObjectId } = require('mongodb');
  const user = await collection.findOne({ _id: new ObjectId(id) });
  if (user) {
    return {
      ...user,
      _id: user._id?.toString(),
    };
  }
  return null;
}

export async function updateUserProgress(
  username: string,
  updates: {
    learnedCards?: string[];
    currentLanguage?: string;
    currentIndex?: number;
    selectedCategories?: string[];
    role?: 'user' | 'admin';
    password?: string;
  }
): Promise<User | null> {
  if (!clientPromise) {
    return null;
  }

  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection<User>(COLLECTION_NAME);

  const result = await collection.findOneAndUpdate(
    { username: username.toLowerCase() },
    {
      $set: {
        ...updates,
        updatedAt: new Date(),
      },
    },
    { returnDocument: 'after' }
  );

  if (result) {
    return {
      ...result,
      _id: result._id?.toString(),
    };
  }
  return null;
}

export async function toggleCardLearned(
  username: string,
  cardId: string,
  learned: boolean
): Promise<User | null> {
  if (!clientPromise) {
    return null;
  }

  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection<User>(COLLECTION_NAME);

  const user = await getUserByUsername(username);
  if (!user) return null;

  let learnedCards = [...user.learnedCards];
  if (learned) {
    if (!learnedCards.includes(cardId)) {
      learnedCards.push(cardId);
    }
  } else {
    learnedCards = learnedCards.filter((id) => id !== cardId);
  }

  return updateUserProgress(username, { learnedCards });
}

