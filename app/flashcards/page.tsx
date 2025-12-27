'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Flashcard from '@/components/Flashcard';
import {
  getLanguageData,
  languageNames,
  uiTranslations,
  type Language,
  type Flashcard as FlashcardType,
} from '@/lib/languageData';
import { filterFlashcardsByCategories } from '@/lib/utils';
import { Shuffle, CheckCircle2, ChevronDown, Sun, Moon, ArrowLeft } from 'lucide-react';
import { useVoices } from '@/lib/useVoices';
import { useTheme } from '@/lib/useTheme';

function FlashcardsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('spanish');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [learnedCards, setLearnedCards] = useState<Set<string>>(new Set());
  const [showLearned, setShowLearned] = useState(true);
  const [uiLanguage, setUiLanguage] = useState<Language>('english');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isVoiceDropdownOpen, setIsVoiceDropdownOpen] = useState(false);
  
  const availableVoices = useVoices();
  const { theme, toggleTheme } = useTheme();

  // Load username and user progress
  useEffect(() => {
    const loadUser = async () => {
      const storedUsername = sessionStorage.getItem('username');
      if (!storedUsername) {
        router.push('/');
        return;
      }

      setUsername(storedUsername);

      // Get categories from URL params or user preferences
      const categoriesParam = searchParams.get('categories');
      const languageParam = searchParams.get('language') as Language | null;

      try {
        const response = await fetch(`/api/users?username=${encodeURIComponent(storedUsername)}`);
        if (response.ok) {
          const data = await response.json();
          const user = data.user;
          if (user) {
            // Load learned cards
            if (user.learnedCards && user.learnedCards.length > 0) {
              setLearnedCards(new Set(user.learnedCards));
            }
            // Load saved language
            const language = languageParam || user.currentLanguage || 'spanish';
            setSelectedLanguage(language as Language);
            // Load selected categories from URL or user preferences
            // Decode each category properly
            let categories: string[] = [];
            if (categoriesParam) {
              categories = categoriesParam.split(',').map(cat => decodeURIComponent(cat.trim())).filter(Boolean);
            } else if (user.selectedCategories && user.selectedCategories.length > 0) {
              categories = user.selectedCategories;
            }
            setSelectedCategories(categories);
            // Load saved index if available
            if (user.currentIndex !== undefined) {
              setCurrentIndex(user.currentIndex);
            }
          } else {
            // If no user, use URL params
            if (languageParam) {
              setSelectedLanguage(languageParam);
            }
            if (categoriesParam) {
              const decodedCategories = categoriesParam.split(',').map(cat => decodeURIComponent(cat.trim())).filter(Boolean);
              setSelectedCategories(decodedCategories);
            }
          }
        }
      } catch (error) {
        console.error('Error loading user:', error);
        // Fallback to URL params
        if (languageParam) {
          setSelectedLanguage(languageParam);
        }
        if (categoriesParam) {
          const decodedCategories = categoriesParam.split(',').map(cat => decodeURIComponent(cat.trim())).filter(Boolean);
          setSelectedCategories(decodedCategories);
        }
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [router, searchParams]);

  // If no categories selected, redirect to categories page
  useEffect(() => {
    if (!loading && selectedCategories.length === 0 && username) {
      router.push(`/categories?language=${selectedLanguage}`);
    }
  }, [loading, selectedCategories.length, username, selectedLanguage, router]);

  // Detect user's locale and set UI language accordingly (client-side only)
  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('es')) {
      setUiLanguage('spanish');
    } else if (browserLang.startsWith('fr')) {
      setUiLanguage('french');
    } else if (browserLang.startsWith('ja')) {
      setUiLanguage('japanese');
    } else {
      setUiLanguage('english');
    }
  }, []);

  // Get language data when language is selected
  const languageData = useMemo(() => {
    return getLanguageData(selectedLanguage);
  }, [selectedLanguage]);

  // Filter cards based on selected categories and learned status
  const availableCards = useMemo(() => {
    // First filter by categories
    let filteredCards = selectedCategories.length > 0
      ? filterFlashcardsByCategories(selectedLanguage, selectedCategories)
      : languageData.flashcards;
    
    // Then filter by learned status
    return filteredCards.filter((card) => {
      if (!showLearned && learnedCards.has(card.id)) {
        return false;
      }
      return true;
    });
  }, [languageData, selectedCategories, selectedLanguage, learnedCards, showLearned]);

  const currentCard = availableCards[currentIndex];
  const totalCards = availableCards.length;
  
  // Count learned cards only from the current filtered set (selected categories)
  const learnedCardsInCurrentSet = useMemo(() => {
    return availableCards.filter((card) => learnedCards.has(card.id)).length;
  }, [availableCards, learnedCards]);
  
  const remainingCards = totalCards - learnedCardsInCurrentSet;

  // Get learned cards from the current language data
  const learnedCardsList = useMemo(() => {
    if (learnedCards.size === 0) return [];
    return languageData.flashcards.filter((card) => {
      // Only include cards from selected categories
      if (selectedCategories.length > 0 && (!card.category || !selectedCategories.includes(card.category))) {
        return false;
      }
      return learnedCards.has(card.id);
    });
  }, [languageData, learnedCards, selectedCategories]);

  // Reset flip when card changes
  useEffect(() => {
    setIsFlipped(false);
  }, [currentIndex, selectedLanguage]);

  // Ensure currentIndex is valid when availableCards changes
  useEffect(() => {
    if (availableCards.length > 0 && currentIndex >= availableCards.length) {
      setCurrentIndex(0);
    }
  }, [availableCards.length, currentIndex]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.language-dropdown')) {
        setIsLanguageDropdownOpen(false);
      }
      if (!target.closest('.voice-dropdown')) {
        setIsVoiceDropdownOpen(false);
      }
    };
    if (isLanguageDropdownOpen || isVoiceDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isLanguageDropdownOpen, isVoiceDropdownOpen]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < totalCards - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(totalCards - 1);
    }
  };

  const handleShuffle = () => {
    if (availableCards.length === 0) return;
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    setCurrentIndex(randomIndex);
  };

  const handleMarkAsLearned = async () => {
    if (!currentCard || !username) return;
    
    const wasLearned = learnedCards.has(currentCard.id);
    const newLearned = new Set(learnedCards);
    if (wasLearned) {
      newLearned.delete(currentCard.id);
    } else {
      newLearned.add(currentCard.id);
    }
    setLearnedCards(newLearned);

    // Save to database
    try {
      await fetch('/api/users/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          cardId: currentCard.id,
          learned: !wasLearned,
        }),
      });
    } catch (error) {
      console.error('Error saving progress:', error);
    }

    // Move to next card if marking as learned
    if (!wasLearned) {
      setTimeout(() => {
        if (currentIndex < availableCards.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
        }
      }, 300);
    }
  };

  // Save current state to database
  const saveProgress = async () => {
    if (!username) return;

    try {
      await fetch('/api/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          updates: {
            currentLanguage: selectedLanguage,
            currentIndex,
            selectedCategories,
          },
        }),
      });
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  // Save progress when language, categories, or index changes
  useEffect(() => {
    if (!loading && username) {
      saveProgress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLanguage, selectedCategories, currentIndex, username, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-indigo-900 dark:to-purple-900 flex items-center justify-center">
        <div className="text-cyan-600 dark:text-cyan-400 text-xl">Loading...</div>
      </div>
    );
  }

  if (!currentCard) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-indigo-900 dark:to-purple-900 p-3 sm:p-4 md:p-6 relative overflow-hidden transition-colors duration-300">
      {/* Subtle animated background elements */}
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
      
      <div className="mx-auto max-w-4xl relative z-10 px-2 sm:px-0">
        {/* Header */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push(`/categories?language=${selectedLanguage}`)}
                className="p-1.5 sm:p-2 bg-white/80 dark:bg-white/10 hover:bg-slate-50 dark:hover:bg-white/15 rounded-lg border border-slate-300 dark:border-white/20 transition-colors touch-manipulation"
                title="Change categories"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-slate-700 dark:text-white" />
              </button>
              <div className="text-sm text-slate-600 dark:text-gray-400">
                Welcome, <span className="font-semibold text-cyan-600 dark:text-cyan-400">{username}</span>
              </div>
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
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-cyan-600 dark:text-cyan-400 mb-2 sm:mb-3 md:mb-4 text-center">Language Learning Flashcards</h1>
          {selectedCategories.length > 0 && (
            <div className="mb-4 sm:mb-6 md:mb-8 text-center">
              <div className="inline-flex flex-wrap items-center justify-center gap-2">
                <span className="text-xs sm:text-sm text-slate-500 dark:text-gray-400">Categories:</span>
                {selectedCategories.map((category) => (
                  <span
                    key={category}
                    className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-md text-xs sm:text-sm font-medium"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Controls Container */}
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-5 md:mb-6 shadow-md dark:shadow-none">
            {/* Settings Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-4 sm:mb-5 md:mb-6">
              <div className="relative language-dropdown">
                <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-gray-300 mb-1.5 sm:mb-2">Learning Language</label>
                <button
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="w-full flex items-center justify-between gap-2 bg-white dark:bg-white/10 border border-slate-300 dark:border-white/20 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-white/15 active:bg-slate-100 dark:active:bg-white/20 transition-colors touch-manipulation text-sm sm:text-base"
                >
                  <span className="font-medium truncate">{languageNames[selectedLanguage]}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform flex-shrink-0 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isLanguageDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800/95 backdrop-blur-md border border-slate-300 dark:border-white/20 rounded-lg shadow-xl z-50 max-h-[200px] overflow-y-auto">
                    {(['english', 'spanish', 'french', 'japanese'] as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
              setSelectedLanguage(lang);
              setIsLanguageDropdownOpen(false);
              setCurrentIndex(0);
              // Redirect to categories page when language changes
              router.push(`/categories?language=${lang}`);
                        }}
                        className={`w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 active:bg-slate-200 dark:active:bg-white/20 transition-colors first:rounded-t-lg last:rounded-b-lg touch-manipulation ${
                          selectedLanguage === lang ? 'bg-slate-100 dark:bg-white/10 font-medium' : ''
                        }`}
                      >
                        {languageNames[lang]}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative voice-dropdown">
                <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-gray-300 mb-1.5 sm:mb-2">Voice</label>
                <button
                  onClick={() => setIsVoiceDropdownOpen(!isVoiceDropdownOpen)}
                  className="w-full flex items-center justify-between gap-2 bg-white dark:bg-white/10 border border-slate-300 dark:border-white/20 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-white/15 active:bg-slate-100 dark:active:bg-white/20 transition-colors touch-manipulation text-sm sm:text-base"
                >
                  <span className="truncate text-left flex-1">
                    {selectedVoice ? selectedVoice.name : 'Auto (Female)'}
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform flex-shrink-0 ${isVoiceDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isVoiceDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800/95 backdrop-blur-md border border-slate-300 dark:border-white/20 rounded-lg shadow-xl z-50 max-h-[250px] sm:max-h-[300px] overflow-y-auto">
                    <button
                      onClick={() => {
                        setSelectedVoice(null);
                        setIsVoiceDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 active:bg-slate-200 dark:active:bg-white/20 transition-colors first:rounded-t-lg touch-manipulation ${
                        !selectedVoice ? 'bg-slate-100 dark:bg-white/10 font-medium' : ''
                      }`}
                    >
                      <div className="font-medium text-sm sm:text-base">Auto (Female)</div>
                      <div className="text-[10px] sm:text-xs text-slate-500 dark:text-gray-400">Automatic voice selection</div>
                    </button>
                    {availableVoices.map((voice, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedVoice(voice);
                          setIsVoiceDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 active:bg-slate-200 dark:active:bg-white/20 transition-colors last:rounded-b-lg touch-manipulation ${
                          selectedVoice?.name === voice.name ? 'bg-slate-100 dark:bg-white/10' : ''
                        }`}
                        title={`${voice.name} (${voice.lang})`}
                      >
                        <div className="font-medium text-sm sm:text-base truncate">{voice.name}</div>
                        <div className="text-[10px] sm:text-xs text-slate-500 dark:text-gray-400 truncate">{voice.lang}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <button
                onClick={handleShuffle}
                className="flex items-center gap-1.5 sm:gap-2 bg-white dark:bg-white/10 border border-slate-300 dark:border-white/20 rounded-lg px-4 sm:px-5 py-2 sm:py-2.5 text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-white/15 active:bg-slate-100 dark:active:bg-white/20 transition-all hover:scale-105 active:scale-95 text-xs sm:text-sm font-medium shadow dark:shadow-none touch-manipulation flex-1 sm:flex-initial min-w-0"
              >
                <Shuffle className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="whitespace-nowrap">Shuffle</span>
              </button>
              <button
                onClick={handleMarkAsLearned}
                className={`flex items-center gap-1.5 sm:gap-2 backdrop-blur-sm border rounded-lg px-4 sm:px-5 py-2 sm:py-2.5 text-white transition-all hover:scale-105 active:scale-95 text-xs sm:text-sm font-medium shadow dark:shadow-none touch-manipulation flex-1 sm:flex-initial min-w-0 ${
                  learnedCards.has(currentCard.id) 
                    ? 'bg-green-500 dark:bg-green-500/20 border-green-600 dark:border-green-500/30 hover:bg-green-600 dark:hover:bg-green-500/30' 
                    : 'bg-indigo-600 dark:bg-white/10 border-indigo-700 dark:border-white/20 hover:bg-indigo-700 dark:hover:bg-white/15'
                }`}
              >
                <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="whitespace-nowrap">Mark as learned</span>
              </button>
            </div>
          </div>
          
          <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 text-center px-2">Click the card to flip it. Use Shuffle or Mark as learned.</p>
        </div>

        {/* Flashcard */}
        <div className="mb-4 sm:mb-6 md:mb-8 flex items-center justify-center">
          <Flashcard
            front={currentCard.front}
            back={currentCard.back}
            isFlipped={isFlipped}
            onFlip={handleFlip}
            selectedLanguage={selectedLanguage}
            selectedVoice={selectedVoice}
            className="w-full"
          />
        </div>

        {/* Progress indicator */}
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-xl p-3 sm:p-4 md:p-5 shadow-md dark:shadow-none">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-gray-300">Progress</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-gray-300">
              {remainingCards} / {totalCards} cards left
            </span>
          </div>
          <div className="h-2 sm:h-3 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-500 dark:via-purple-500 dark:to-pink-500 transition-all duration-500 rounded-full"
              style={{
                width: `${((totalCards - remainingCards) / totalCards) * 100}%`,
              }}
            />
          </div>
          <div className="mt-1.5 sm:mt-2 flex items-center justify-between text-[10px] sm:text-xs text-slate-600 dark:text-gray-400">
            <span>{learnedCardsInCurrentSet} learned</span>
            <span>{totalCards > 0 ? Math.round((learnedCardsInCurrentSet / totalCards) * 100) : 0}% complete</span>
          </div>
        </div>

        {/* Learned Cards Section */}
        {learnedCardsList.length > 0 && (
          <div className="mt-6 sm:mt-8 bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-xl p-4 sm:p-6 shadow-md dark:shadow-none">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-white mb-4 sm:mb-6">
              Learned Cards ({learnedCardsList.length})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {learnedCardsList.map((card) => (
                <button
                  key={card.id}
                  onClick={() => {
                    const cardIndex = availableCards.findIndex((c) => c.id === card.id);
                    if (cardIndex !== -1) {
                      setCurrentIndex(cardIndex);
                      setIsFlipped(false);
                      // Scroll to top of page
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="group relative bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-300 dark:border-green-700/50 rounded-lg p-3 sm:p-4 hover:border-green-500 dark:hover:border-green-500 hover:shadow-lg dark:hover:shadow-green-500/20 transition-all hover:scale-105 active:scale-95 touch-manipulation"
                  title={`${card.front} → ${card.back}`}
                >
                  {/* Checkmark badge */}
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  
                  {/* Card content */}
                  <div className="text-left space-y-2">
                    <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-white line-clamp-2 leading-tight">
                      {card.front}
                    </p>
                    <p className="text-[10px] sm:text-xs text-slate-600 dark:text-gray-400 line-clamp-2 leading-tight">
                      {card.back}
                    </p>
                    {card.category && (
                      <span className="inline-block px-1.5 py-0.5 bg-green-200 dark:bg-green-800/30 text-green-800 dark:text-green-300 rounded text-[9px] sm:text-[10px] font-medium">
                        {card.category}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs sm:text-sm text-slate-500 dark:text-gray-400 text-center">
              Click any card to review it
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FlashcardsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-indigo-900 dark:to-purple-900 flex items-center justify-center">
        <div className="text-cyan-600 dark:text-cyan-400 text-xl">Loading...</div>
      </div>
    }>
      <FlashcardsContent />
    </Suspense>
  );
}
