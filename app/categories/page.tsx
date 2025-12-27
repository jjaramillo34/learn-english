'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTheme } from '@/lib/useTheme';
import { getCategories, filterFlashcardsByCategories } from '@/lib/utils';
import type { Language } from '@/lib/languageData';
import { languageNames, getLanguageData } from '@/lib/languageData';
import { 
  CheckCircle2, 
  Plane, 
  MessageCircle, 
  Hash, 
  Palette, 
  UtensilsCrossed, 
  Clock, 
  Users, 
  Heart, 
  MapPin,
  Calendar,
  ShoppingCart,
  Banknote,
  Hotel,
  ShieldCheck,
  HelpCircle,
  // Removed 'Money' because it is not exported from 'lucide-react'
} from 'lucide-react';

function CategoriesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const language = (searchParams.get('language') as Language) || 'spanish';
  const { theme } = useTheme();
  const [username, setUsername] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [learnedCards, setLearnedCards] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const categories = useMemo(() => getCategories(language), [language]);
  
  // Category icons mapping - using component constructors instead of JSX
  const getCategoryIcon = (category: string) => {
    const iconProps = { className: "h-5 w-5 sm:h-6 sm:w-6" };
    switch (category) {
      case 'Travel':
        return <Plane {...iconProps} />;
      case 'Common Phrases':
        return <MessageCircle {...iconProps} />;
      case 'Numbers':
        return <Hash {...iconProps} />;
      case 'Colors':
        return <Palette {...iconProps} />;
      case 'Food & Drink':
        return <UtensilsCrossed {...iconProps} />;
      case 'Time & Date':
        return <Clock {...iconProps} />;
      case 'Family & People':
        return <Users {...iconProps} />;
      case 'Body & Health':
        return <Heart {...iconProps} />;
      case 'Directions & Places':
        return <MapPin {...iconProps} />;
      case 'Parties & Events':
        return <Calendar {...iconProps} />;
      case 'Airport & Flights & Border':
        return <Plane {...iconProps} />;
      case 'Hotels & Accommodation':
        return <Hotel {...iconProps} />;
      case 'Emergencies & Safety':
        return <ShieldCheck {...iconProps} />;
      case 'Small Talk & Introductions':
        return <MessageCircle {...iconProps} />;
      case 'Shopping & Money':
        return <Banknote {...iconProps} />;
      default:
        return <HelpCircle {...iconProps} />;
    }
  };

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    if (!storedUsername) {
      router.push('/');
      return;
    }

    setUsername(storedUsername);

    // Load user's saved categories
    const loadUser = async () => {
      try {
        const response = await fetch(`/api/users?username=${encodeURIComponent(storedUsername)}`);
        if (response.ok) {
          const data = await response.json();
          const user = data.user;
          if (user) {
            if (user.selectedCategories && user.selectedCategories.length > 0) {
              setSelectedCategories(user.selectedCategories);
            }
            if (user.learnedCards && user.learnedCards.length > 0) {
              setLearnedCards(new Set(user.learnedCards));
            }
          }
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [router]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedCategories.length === categories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories([...categories]);
    }
  };

  const handleContinue = async () => {
    if (selectedCategories.length === 0) {
      alert('Please select at least one category');
      return;
    }

    setSaving(true);

    try {
      // Save selected categories to user profile
      await fetch('/api/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          updates: {
            selectedCategories,
            currentLanguage: language,
          },
        }),
      });

      // Navigate to flashcards with selected categories (encode each category separately)
      const encodedCategories = selectedCategories.map(cat => encodeURIComponent(cat)).join(',');
      router.push(`/flashcards?categories=${encodedCategories}&language=${language}`);
    } catch (error) {
      console.error('Error saving categories:', error);
      alert('Error saving categories. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const getCategoryCardCount = (category: string) => {
    return filterFlashcardsByCategories(language, [category]).length;
  };

  const getCategoryLearnedCount = (category: string) => {
    const categoryCards = filterFlashcardsByCategories(language, [category]);
    return categoryCards.filter((card) => learnedCards.has(card.id)).length;
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-indigo-900 dark:to-purple-900 flex items-center justify-center">
        <div className="text-cyan-600 dark:text-cyan-400 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-indigo-900 dark:to-purple-900 p-3 sm:p-4 md:p-6 relative overflow-hidden transition-colors duration-300">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-blue-300/30 dark:bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-96 sm:h-96 bg-purple-300/30 dark:bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="mx-auto max-w-4xl relative z-10 px-2 sm:px-0">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-slate-600 dark:text-gray-400">
              Welcome, <span className="font-semibold text-cyan-600 dark:text-cyan-400">{username}</span>
            </div>
            <button
              onClick={() => {
                sessionStorage.removeItem('username');
                router.push('/');
              }}
              className="text-xs text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-300 underline"
            >
              Switch User
            </button>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-600 dark:text-cyan-400 mb-2 text-center">
            Choose Categories to Study
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400 text-center mb-6">
            Learning: <span className="font-semibold">{languageNames[language]}</span>
          </p>

          {/* Select All Button */}
          <div className="flex justify-center mb-4">
            <button
              onClick={handleSelectAll}
              className="px-4 py-2 bg-white/80 dark:bg-white/10 border border-slate-300 dark:border-white/20 rounded-lg text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-white/15 transition-colors text-sm font-medium"
            >
              {selectedCategories.length === categories.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-xl p-4 sm:p-6 mb-6 shadow-md dark:shadow-none">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category);
              const cardCount = getCategoryCardCount(category);
              const learnedCount = getCategoryLearnedCount(category);
              const hasLearnedCards = learnedCount > 0;
              const categoryIcon = getCategoryIcon(category);
              
              return (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`p-4 sm:p-5 rounded-xl border-2 transition-all text-left touch-manipulation relative ${
                    isSelected
                      ? 'bg-indigo-100 dark:bg-indigo-900/30 border-indigo-500 dark:border-indigo-400 shadow-md'
                      : 'bg-white dark:bg-white/5 border-slate-300 dark:border-white/20 hover:border-indigo-300 dark:hover:border-indigo-500/50'
                  }`}
                >
                  {/* Learned indicator badge */}
                  {hasLearnedCards && (
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex items-center gap-1 px-2 py-0.5 bg-green-500 dark:bg-green-600 rounded-full">
                      <CheckCircle2 className="h-3 w-3 text-white" />
                      <span className="text-[10px] font-semibold text-white">{learnedCount}</span>
                    </div>
                  )}
                  
                  {/* Selection checkmark */}
                  {isSelected && !hasLearnedCards && (
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-5 h-5 sm:w-6 sm:h-6 bg-indigo-600 dark:bg-indigo-400 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                  
                  {/* Category icon */}
                  <div className={`mb-3 inline-flex p-2 rounded-lg ${
                    isSelected
                      ? 'bg-indigo-200 dark:bg-indigo-800/50 text-indigo-700 dark:text-indigo-300'
                      : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-gray-400'
                  }`}>
                    {categoryIcon}
                  </div>
                  
                  <div className="flex items-start justify-between mb-2">
                    <h3 className={`font-semibold text-base sm:text-lg ${
                      isSelected
                        ? 'text-indigo-700 dark:text-indigo-300'
                        : 'text-slate-800 dark:text-white'
                    }`}>
                      {category}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className={`text-xs sm:text-sm ${
                      isSelected
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-500 dark:text-gray-400'
                    }`}>
                      {cardCount} {cardCount === 1 ? 'card' : 'cards'}
                    </p>
                    {hasLearnedCards && (
                      <span className={`text-[10px] sm:text-xs font-medium ${
                        isSelected
                          ? 'text-green-700 dark:text-green-400'
                          : 'text-green-600 dark:text-green-500'
                      }`}>
                        {learnedCount} learned
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {selectedCategories.length === 0 && (
            <div className="mt-4 text-center">
              <p className="text-sm text-amber-600 dark:text-amber-400">
                Please select at least one category to continue
              </p>
            </div>
          )}

          {selectedCategories.length > 0 && (
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10">
              <p className="text-sm text-slate-600 dark:text-gray-400 text-center">
                {selectedCategories.length} {selectedCategories.length === 1 ? 'category' : 'categories'} selected
              </p>
            </div>
          )}
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            disabled={selectedCategories.length === 0 || saving}
            className="w-full sm:w-auto px-8 py-3 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 disabled:bg-slate-400 dark:disabled:bg-slate-600 text-white font-medium rounded-lg transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:hover:scale-100 touch-manipulation shadow-lg dark:shadow-none text-base"
          >
            {saving ? 'Saving...' : `Continue with ${selectedCategories.length || 0} ${selectedCategories.length === 1 ? 'category' : 'categories'}`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CategoriesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-indigo-900 dark:to-purple-900 flex items-center justify-center">
        <div className="text-cyan-600 dark:text-cyan-400 text-xl">Loading...</div>
      </div>
    }>
      <CategoriesContent />
    </Suspense>
  );
}

