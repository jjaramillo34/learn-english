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
      // Filter for female voices
      const femaleVoices = availableVoices.filter((voice) => {
        const name = voice.name.toLowerCase();
        // Exclude obvious male indicators
        const isNotMale = !name.includes('male') && !name.includes('david') && 
                         !name.includes('daniel') && !name.includes('james') &&
                         !name.includes('john') && !name.includes('mark') &&
                         !name.includes('thomas') && !name.includes('alex') &&
                         !name.includes('tom') && !name.includes('fred');
        // Prefer voices that explicitly mention female characteristics or common female names
        const isFemale = name.includes('female') || name.includes('woman') ||
                        name.includes('zira') || name.includes('hazel') ||
                        name.includes('samantha') || name.includes('karen') ||
                        name.includes('victoria') || name.includes('susan') ||
                        name.includes('maria') || name.includes('carmen') ||
                        name.includes('helen') || name.includes('monica') ||
                        name.includes('paulina') || name.includes('kyoko') ||
                        name.includes('sayaka') || name.includes('amara') ||
                        name.includes('fiona') || name.includes('veena') ||
                        name.includes('tessa') || name.includes('samantha') ||
                        name.includes('anna') || name.includes('linda') ||
                        name.includes('laura') || name.includes('nicole');
        
        return isFemale || isNotMale;
      });
      setVoices(femaleVoices.length > 0 ? femaleVoices : availableVoices);
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

