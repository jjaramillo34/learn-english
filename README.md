# Language Learning Flashcards

An interactive language learning application built with Next.js, featuring flashcards for learning English, Spanish, French, and Japanese.

## Features

- 📚 **Multiple Languages**: Learn English, Spanish, French, or Japanese
- 🎯 **Interactive Flashcards**: Flip cards to reveal translations
- 🔊 **Audio Pronunciation**: Text-to-speech with word-by-word pronunciation
- 👤 **User Progress Tracking**: Save your progress with MongoDB
- 🎨 **Dark/Light Theme**: Beautiful themes with smooth transitions
- 📱 **Mobile Friendly**: Fully responsive design
- 🎲 **Shuffle Cards**: Mix up your learning order
- ✅ **Mark as Learned**: Track which cards you've mastered

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database (local or MongoDB Atlas)

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Set up MongoDB:

   - Option A: Use MongoDB Atlas (recommended for production)
     1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
     2. Create a new cluster
     3. Get your connection string

   - Option B: Use local MongoDB
     - Install MongoDB locally
     - Default connection: `mongodb://localhost:27017/learn-english`

3. Create a `.env.local` file in the root directory:

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
```

Or for local MongoDB:
```bash
MONGODB_URI=mongodb://localhost:27017/learn-english
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Enter Username**: On the homepage, enter a username (minimum 3 characters)
2. **Start Learning**: You'll be redirected to the flashcards page
3. **Flip Cards**: Click on any card to flip it and see the translation
4. **Listen**: Click the speaker icon to hear pronunciation
5. **Word-by-Word**: Click individual words at the bottom to hear them pronounced separately
6. **Track Progress**: Mark cards as learned to track your progress
7. **Switch Themes**: Use the theme toggle button in the top-right corner

## Project Structure

```
learn-english/
├── app/
│   ├── api/
│   │   └── users/          # API routes for user management
│   ├── flashcards/         # Flashcards study page
│   ├── page.tsx            # Homepage with username form
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── components/
│   └── Flashcard.tsx       # Flashcard component
├── lib/
│   ├── languageData.ts     # Language data and flashcards
│   ├── models/
│   │   └── User.ts         # User model and database functions
│   ├── mongodb.ts          # MongoDB connection
│   ├── useSpeech.ts        # Speech synthesis hook
│   ├── useTheme.ts         # Theme management hook
│   └── useVoices.ts        # Voice selection hook
└── package.json
```

## Technologies Used

- **Next.js 16**: React framework
- **TypeScript**: Type safety
- **Tailwind CSS v4**: Styling
- **MongoDB**: Database for user progress
- **Web Speech API**: Text-to-speech functionality
- **Lucide React**: Icons

## Environment Variables

- `MONGODB_URI`: MongoDB connection string (required for database features)

## Database Schema

The application stores user data in MongoDB with the following structure:

```typescript
{
  username: string;
  learnedCards: string[];        // Array of card IDs
  currentLanguage?: string;      // Last selected language
  currentIndex?: number;         // Last viewed card index
  createdAt: Date;
  updatedAt: Date;
}
```

## Build for Production

```bash
npm run build
npm start
```

## Notes

- If MongoDB is not configured, the app will still work but won't save progress
- Progress is saved to sessionStorage in the browser
- Users can switch accounts using the "Switch User" button
