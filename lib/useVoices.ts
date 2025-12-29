'use client';

import { useState, useEffect } from 'react';

export function useVoices() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      
      // Filter to only Google voices for English and Spanish
      const filteredVoices = availableVoices.filter((voice) => {
        const name = voice.name.toLowerCase();
        const lang = voice.lang.toLowerCase();
        
        // Check if it's a Google voice (usually contains "Google" in the name)
        const isGoogleVoice = name.includes('google');
        
        // Check if it's English (en) or Spanish (es)
        const isEnglish = lang.startsWith('en');
        const isSpanish = lang.startsWith('es');
        
        return isGoogleVoice && (isEnglish || isSpanish);
      });
      
      setVoices(filteredVoices.length > 0 ? filteredVoices : availableVoices);
    };

    // Load voices after a small delay to ensure they're available
    const timeoutId = setTimeout(() => {
      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== null) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [isMounted]);

  return voices;
}

