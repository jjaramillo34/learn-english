'use client';

import { Volume2 } from 'lucide-react';
import { Language } from '@/lib/languageData';
import { useSpeech } from '@/lib/useSpeech';
import React, { useMemo } from 'react';

interface FlashcardProps {
  front: string;
  back: string;
  isFlipped: boolean;
  onFlip: () => void;
  selectedLanguage: Language;
  selectedVoice?: SpeechSynthesisVoice | null;
  className?: string;
}

export default function Flashcard({ front, back, isFlipped, onFlip, selectedLanguage, selectedVoice, className = '' }: FlashcardProps) {
  const { speak, stop } = useSpeech(selectedVoice);

  // Split text into words, preserving punctuation for display
  // Updated regex to handle accented characters and special characters like ñ
  const frontWords = useMemo(() => {
    // Match words including accented characters (á, é, í, ó, ú, ñ, etc.) and apostrophes
    return front.match(/[\p{L}']+|[.,!?;:()"]/gu) || [];
  }, [front]);

  const backWords = useMemo(() => {
    // Match words including accented characters (á, é, í, ó, ú, ñ, etc.) and apostrophes
    return back.match(/[\p{L}']+|[.,!?;:()"]/gu) || [];
  }, [back]);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card flip when clicking speaker
    stop(); // Stop any current speech
    if (isFlipped) {
      // Back is always in the selected learning language
      speak(back, selectedLanguage);
    } else {
      // Front is always in the other language (Spanish if learning English, English if learning Spanish)
      speak(front, selectedLanguage === 'english' ? 'spanish' : 'english');
    }
  };

  const handleWordSpeak = (e: React.MouseEvent, word: string) => {
    e.stopPropagation(); // Prevent card flip
    stop(); // Stop any current speech
    // Only speak actual words, skip punctuation
    // Updated to handle accented characters and special characters like ñ
    if (word.match(/^[\p{L}']+$/u)) {
      if (isFlipped) {
        // Back is always in the selected learning language
        speak(word, selectedLanguage);
      } else {
        // Front is always in the other language (Spanish if learning English, English if learning Spanish)
        speak(word, selectedLanguage === 'english' ? 'spanish' : 'english');
      }
    }
  };

  return (
    <div
      className={`relative h-125 sm:h-137.5 md:h-150 w-full max-w-2xl cursor-pointer perspective-1000 ${className} touch-manipulation`}
      onClick={onFlip}
    >
      <div
        className={`relative h-full w-full preserve-3d transition-transform duration-700 ease-in-out ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden rounded-2xl sm:rounded-3xl border border-slate-300 dark:border-white/20 bg-linear-to-br from-indigo-500/90 via-purple-500/90 to-pink-500/90 dark:from-indigo-600/80 dark:via-purple-600/80 dark:to-pink-600/80 backdrop-blur-sm p-4 sm:p-6 md:p-8 shadow-xl dark:shadow-2xl flex items-center justify-center overflow-hidden group">
          {/* Subtle decorative circles */}
          <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-blue-300/40 dark:bg-blue-400/20 rounded-full -mr-24 sm:-mr-32 -mt-24 sm:-mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-36 h-36 sm:w-48 sm:h-48 bg-purple-300/40 dark:bg-purple-400/20 rounded-full -ml-18 sm:-ml-24 -mb-18 sm:-mb-24 blur-3xl"></div>
          
          {/* Card state label */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 bg-white/80 dark:bg-black/40 backdrop-blur-sm rounded-md px-2 py-1 sm:px-3 sm:py-1.5 border border-slate-300 dark:border-white/10">
            <span className="text-[10px] sm:text-xs font-medium text-slate-700 dark:text-white/90">
              Front · {selectedLanguage === 'english' ? 'Spanish' : 'English'}
            </span>
          </div>
          
          {/* Speaker button */}
          <button
            onClick={handleSpeak}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 bg-white/90 dark:bg-white/20 hover:bg-white dark:hover:bg-white/30 active:bg-slate-100 dark:active:bg-white/40 backdrop-blur-sm rounded-full p-2 sm:p-2.5 border border-slate-300 dark:border-white/20 transition-all hover:scale-110 active:scale-95 z-20 shadow dark:shadow-lg touch-manipulation"
            aria-label="Pronounce"
            title="Click to hear pronunciation"
          >
            <Volume2 className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 dark:text-white" />
          </button>
          
          <div className="relative z-10 w-full text-center px-3 sm:px-4 md:px-6 flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 py-2 sm:py-3 md:py-4 overflow-hidden">
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white drop-shadow dark:drop-shadow-lg leading-tight mb-1 sm:mb-2 px-2 wrap-break-word">{front}</p>
            
            {/* Word-by-word pronunciation */}
            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 w-full px-2 sm:px-3 md:px-4">
              {frontWords.map((word, index) => {
                // Updated to handle accented characters and special characters like ñ
                const isWord = word.match(/^[\p{L}']+$/u);
                return (
                  <button
                    key={index}
                    onClick={(e) => handleWordSpeak(e, word)}
                    disabled={!isWord}
                    className={`px-1.5 py-0.5 sm:px-2 sm:py-1 bg-white dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/20 active:bg-slate-200 dark:active:bg-white/30 backdrop-blur-sm rounded border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white text-[10px] sm:text-xs font-medium transition-all hover:scale-105 hover:border-indigo-400 dark:hover:border-white/40 active:scale-95 shadow dark:shadow-none touch-manipulation ${
                      !isWord ? 'opacity-50 cursor-default' : 'cursor-pointer'
                    }`}
                    title={isWord ? `Click to pronounce: ${word}` : ''}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl sm:rounded-3xl border border-slate-300 dark:border-white/20 bg-linear-to-br from-indigo-500/90 via-purple-500/90 to-pink-500/90 dark:from-indigo-600/80 dark:via-purple-600/80 dark:to-pink-600/80 backdrop-blur-sm p-4 sm:p-6 md:p-8 shadow-xl dark:shadow-2xl flex items-center justify-center overflow-hidden group">
          {/* Subtle decorative circles */}
          <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-pink-300/40 dark:bg-pink-400/20 rounded-full -ml-24 sm:-ml-32 -mt-24 sm:-mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-36 h-36 sm:w-48 sm:h-48 bg-purple-300/40 dark:bg-purple-400/20 rounded-full -mr-18 sm:-mr-24 -mb-18 sm:-mb-24 blur-3xl"></div>
          
          {/* Card state label */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 bg-white/80 dark:bg-black/40 backdrop-blur-sm rounded-md px-2 py-1 sm:px-3 sm:py-1.5 border border-slate-300 dark:border-white/10">
            <span className="text-[10px] sm:text-xs font-medium text-slate-700 dark:text-white/90">
              Back · {selectedLanguage === 'english' ? 'English' : 'Spanish'}
            </span>
          </div>
          
          {/* Speaker button */}
          <button
            onClick={handleSpeak}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 bg-white/90 dark:bg-white/20 hover:bg-white dark:hover:bg-white/30 active:bg-slate-100 dark:active:bg-white/40 backdrop-blur-sm rounded-full p-2 sm:p-2.5 border border-slate-300 dark:border-white/20 transition-all hover:scale-110 active:scale-95 z-20 shadow dark:shadow-lg touch-manipulation"
            aria-label="Pronounce"
            title="Click to hear pronunciation"
          >
            <Volume2 className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 dark:text-white" />
          </button>
          
          <div className="relative z-10 w-full text-center px-3 sm:px-4 md:px-6 flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 py-2 sm:py-3 md:py-4 overflow-hidden">
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white drop-shadow dark:drop-shadow-lg leading-tight mb-1 sm:mb-2 px-2 wrap-break-word">{back}</p>
            
            {/* Word-by-word pronunciation */}
            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 w-full px-2 sm:px-3 md:px-4">
              {backWords.map((word, index) => {
                // Updated to handle accented characters and special characters like ñ
                const isWord = word.match(/^[\p{L}']+$/u);
                return (
                  <button
                    key={index}
                    onClick={(e) => handleWordSpeak(e, word)}
                    disabled={!isWord}
                    className={`px-1.5 py-0.5 sm:px-2 sm:py-1 bg-white dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/20 active:bg-slate-200 dark:active:bg-white/30 backdrop-blur-sm rounded border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white text-[10px] sm:text-xs font-medium transition-all hover:scale-105 hover:border-indigo-400 dark:hover:border-white/40 active:scale-95 shadow dark:shadow-none touch-manipulation ${
                      !isWord ? 'opacity-50 cursor-default' : 'cursor-pointer'
                    }`}
                    title={isWord ? `Click to pronounce: ${word}` : ''}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

