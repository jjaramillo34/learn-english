'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/lib/useTheme';
import { Sun, Moon, ChevronDown, ChevronUp, BookOpen, RotateCcw, Volume2, Shuffle, CheckCircle2, Grid3x3 } from 'lucide-react';

export default function Page() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    if (typeof window !== 'undefined') {
      const storedUsername = sessionStorage.getItem('username');
      if (storedUsername) {
        router.push('/flashcards');
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!username.trim()) {
      setError('Please enter a username');
      setLoading(false);
      return;
    }

    if (username.trim().length < 3) {
      setError('Username must be at least 3 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to create user');
        setLoading(false);
        return;
      }

      // Store username in sessionStorage
      sessionStorage.setItem('username', username.trim().toLowerCase());
      
      // Redirect to categories page first
      router.push('/categories?language=spanish');
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
      console.error('Error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-indigo-900 dark:to-purple-900 flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-blue-300/30 dark:bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-96 sm:h-96 bg-purple-300/30 dark:bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 z-50 p-2.5 sm:p-3 bg-slate-800/10 dark:bg-white/10 backdrop-blur-sm border border-slate-300/30 dark:border-white/20 rounded-full hover:bg-slate-800/20 dark:hover:bg-white/20 transition-all hover:scale-110 active:scale-95 shadow-lg touch-manipulation"
        aria-label="Toggle theme"
        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? (
          <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
        ) : (
          <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 dark:text-indigo-400" />
        )}
      </button>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl dark:shadow-none">
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">
              Language Learning Flashcards
            </h1>
            <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-base">
              Enter your username to start learning
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-3 bg-white dark:bg-white/10 border border-slate-300 dark:border-white/20 rounded-lg text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:border-transparent transition-all"
                disabled={loading}
                minLength={3}
                required
              />
              {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-medium py-3 px-4 rounded-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 touch-manipulation shadow-lg dark:shadow-none"
            >
              {loading ? 'Loading...' : 'Start Learning'}
            </button>
          </form>

          <p className="mt-4 text-xs text-center text-slate-500 dark:text-gray-400">
            Your progress will be saved automatically
          </p>
        </div>

        {/* How to Use Accordion */}
        <div className="mt-6 bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl dark:shadow-none overflow-hidden">
          <button
            onClick={() => setIsInstructionsOpen(!isInstructionsOpen)}
            className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors touch-manipulation"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
              <h2 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-white">
                How to Use This App
              </h2>
            </div>
            {isInstructionsOpen ? (
              <ChevronUp className="h-5 w-5 text-slate-600 dark:text-gray-400 flex-shrink-0" />
            ) : (
              <ChevronDown className="h-5 w-5 text-slate-600 dark:text-gray-400 flex-shrink-0" />
            )}
          </button>

          {isInstructionsOpen && (
            <div className="px-4 sm:px-5 pb-4 sm:pb-5 space-y-4 border-t border-slate-200 dark:border-white/10 pt-4">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
                    <span className="text-cyan-600 dark:text-cyan-400 font-semibold text-sm">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 dark:text-white mb-1">Create an Account</h3>
                    <p className="text-sm text-slate-600 dark:text-gray-400">
                      Enter a username (minimum 3 characters) to create your account. Your progress will be saved automatically.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                    <Grid3x3 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 dark:text-white mb-1">Select Categories</h3>
                    <p className="text-sm text-slate-600 dark:text-gray-400">
                      Choose which categories you want to study (Travel, Colors, Food & Drink, etc.). You can select multiple categories.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <RotateCcw className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 dark:text-white mb-1">Flip Cards</h3>
                    <p className="text-sm text-slate-600 dark:text-gray-400">
                      Click on any flashcard to flip it and see the translation. The front shows the English phrase, and the back shows the translation in your target language.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Volume2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 dark:text-white mb-1">Listen to Pronunciation</h3>
                    <p className="text-sm text-slate-600 dark:text-gray-400">
                      Click the speaker icon to hear the full phrase pronounced, or click individual words at the bottom to hear them one by one. All voices are female by default.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                    <Shuffle className="h-4 w-4 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 dark:text-white mb-1">Shuffle Cards</h3>
                    <p className="text-sm text-slate-600 dark:text-gray-400">
                      Use the shuffle button to randomly jump to a different card and mix up your learning order.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 dark:text-white mb-1">Mark as Learned</h3>
                    <p className="text-sm text-slate-600 dark:text-gray-400">
                      Click "Mark as learned" when you've mastered a card. Your progress is tracked, and learned cards appear at the bottom as thumbnails for easy review.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Sun className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 dark:text-white mb-1">Customize Your Experience</h3>
                    <p className="text-sm text-slate-600 dark:text-gray-400">
                      Switch between light and dark themes using the theme toggle button. Change your learning language and voice preferences in the settings dropdowns.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
