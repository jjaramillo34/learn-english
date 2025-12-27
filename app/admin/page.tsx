'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/lib/useTheme';
import { Sun, Moon, Users, BookOpen, TrendingUp, Clock, Globe } from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [loadingStats, setLoadingStats] = useState(false);

  useEffect(() => {
    // Check if admin is already logged in
    if (typeof window !== 'undefined') {
      const adminSession = sessionStorage.getItem('adminSession');
      if (adminSession === 'true') {
        setIsAuthenticated(true);
        loadStats();
      }
    }
  }, []);

  const loadStats = async () => {
    setLoadingStats(true);
    try {
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
        setRecentUsers(data.recentUsers || []);
      } else {
        console.error('Failed to load stats');
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Invalid credentials');
        setLoading(false);
        return;
      }

      // Set admin session
      sessionStorage.setItem('adminSession', 'true');
      setIsAuthenticated(true);
      loadStats();
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminSession');
    setIsAuthenticated(false);
    setStats(null);
    setRecentUsers([]);
  };

  if (!isAuthenticated) {
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
                Admin Login
              </h1>
              <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-base">
                Enter your admin credentials
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="admin-username"
                  className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2"
                >
                  Username
                </label>
                <input
                  id="admin-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Admin username"
                  className="w-full px-4 py-3 bg-white dark:bg-white/10 border border-slate-300 dark:border-white/20 rounded-lg text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:border-transparent transition-all"
                  disabled={loading}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2"
                >
                  Password
                </label>
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Admin password"
                  className="w-full px-4 py-3 bg-white dark:bg-white/10 border border-slate-300 dark:border-white/20 rounded-lg text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:border-transparent transition-all"
                  disabled={loading}
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-medium py-3 px-4 rounded-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 touch-manipulation shadow-lg dark:shadow-none"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-indigo-900 dark:to-purple-900 p-3 sm:p-4 md:p-6 relative overflow-hidden transition-colors duration-300">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-blue-300/30 dark:bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-96 sm:h-96 bg-purple-300/30 dark:bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 z-50 p-2.5 sm:p-3 bg-slate-800/10 dark:bg-white/10 backdrop-blur-sm border border-slate-300/30 dark:border-white/20 rounded-full hover:bg-slate-800/20 dark:hover:bg-white/20 transition-all hover:scale-110 active:scale-95 shadow-lg touch-manipulation"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
        ) : (
          <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 dark:text-indigo-400" />
        )}
      </button>

      <div className="mx-auto max-w-6xl relative z-10 px-2 sm:px-0">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-600 dark:text-cyan-400">
              Admin Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-all hover:scale-105 active:scale-95"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        {loadingStats ? (
          <div className="text-center py-12 text-cyan-600 dark:text-cyan-400">
            Loading statistics...
          </div>
        ) : stats ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-xl p-4 sm:p-6 shadow-md dark:shadow-none">
                <div className="flex items-center justify-between mb-2">
                  <Users className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-1">
                  {stats.totalUsers}
                </div>
                <div className="text-sm text-slate-600 dark:text-gray-400">Total Users</div>
              </div>

              <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-xl p-4 sm:p-6 shadow-md dark:shadow-none">
                <div className="flex items-center justify-between mb-2">
                  <BookOpen className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-1">
                  {stats.totalLearnedCards}
                </div>
                <div className="text-sm text-slate-600 dark:text-gray-400">Total Learned Cards</div>
              </div>

              <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-xl p-4 sm:p-6 shadow-md dark:shadow-none">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-1">
                  {stats.averageLearnedCards}
                </div>
                <div className="text-sm text-slate-600 dark:text-gray-400">Avg Cards per User</div>
              </div>

              <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-xl p-4 sm:p-6 shadow-md dark:shadow-none">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-1">
                  {stats.recentlyActive}
                </div>
                <div className="text-sm text-slate-600 dark:text-gray-400">Active (7 days)</div>
              </div>
            </div>

            {/* Language Distribution */}
            <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-md dark:shadow-none">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Users by Language
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Object.entries(stats.usersByLanguage).map(([language, count]) => (
                  <div key={language} className="text-center">
                    <div className="text-2xl font-bold text-slate-800 dark:text-white">{count as number}</div>
                    <div className="text-sm text-slate-600 dark:text-gray-400 capitalize">{language}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Users Table */}
            <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-xl p-4 sm:p-6 shadow-md dark:shadow-none">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-white mb-4">
                Recent Users (Last 100)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-white/10">
                      <th className="text-left py-2 px-2 text-slate-700 dark:text-gray-300">Username</th>
                      <th className="text-left py-2 px-2 text-slate-700 dark:text-gray-300">Learned Cards</th>
                      <th className="text-left py-2 px-2 text-slate-700 dark:text-gray-300">Language</th>
                      <th className="text-left py-2 px-2 text-slate-700 dark:text-gray-300">Categories</th>
                      <th className="text-left py-2 px-2 text-slate-700 dark:text-gray-300">Last Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr key={user._id} className="border-b border-slate-200 dark:border-white/10">
                        <td className="py-2 px-2 text-slate-800 dark:text-white font-medium">{user.username}</td>
                        <td className="py-2 px-2 text-slate-600 dark:text-gray-400">{user.learnedCardsCount}</td>
                        <td className="py-2 px-2 text-slate-600 dark:text-gray-400 capitalize">{user.currentLanguage}</td>
                        <td className="py-2 px-2 text-slate-600 dark:text-gray-400">{user.selectedCategories.length}</td>
                        <td className="py-2 px-2 text-slate-600 dark:text-gray-400">
                          {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

