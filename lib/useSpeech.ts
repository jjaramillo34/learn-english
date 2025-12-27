import { useCallback, useEffect, useState } from 'react';
import { Language } from './languageData';

// Map our language codes to Web Speech API language codes
const languageCodes: Record<Language, string> = {
  english: 'en-US',
  spanish: 'es-ES',
  french: 'fr-FR',
  japanese: 'ja-JP',
};

export function useSpeech(selectedVoice?: SpeechSynthesisVoice | null) {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Load voices when component mounts
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    // Voices may be loaded asynchronously
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = useCallback((text: string, language: Language) => {
    // Check if the browser supports speech synthesis
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech synthesis is not supported in this browser');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set the language
    utterance.lang = languageCodes[language];
    
    // Configure voice settings for better pronunciation
    utterance.rate = 0.9; // Slightly slower for better comprehension
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Get fresh voices list (in case they weren't loaded before)
    const availableVoices = window.speechSynthesis.getVoices();
    const languagePrefix = languageCodes[language].split('-')[0];
    
    // Filter for female voices (voice name often contains clues like "female", "woman", 
    // or specific names, or we can check if voice.name doesn't contain male indicators)
    const femaleVoices = availableVoices.filter((voice) => {
      const name = voice.name.toLowerCase();
      // Exclude obvious male indicators
      const isNotMale = !name.includes('male') && !name.includes('david') && 
                       !name.includes('daniel') && !name.includes('james') &&
                       !name.includes('john') && !name.includes('mark');
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
                      name.includes('tessa') || name.includes('samantha');
      
      return isFemale || (isNotMale && voice.lang.startsWith(languagePrefix));
    });
    
    // Use selected voice if provided, otherwise try to find a female voice that matches the language
    let preferredVoice: SpeechSynthesisVoice | null = null;
    
    if (selectedVoice) {
      preferredVoice = selectedVoice;
    } else {
      // Prefer voices that match the exact locale, then fall back to language prefix
      preferredVoice = femaleVoices.find(
        (voice) => voice.lang === languageCodes[language]
      ) || femaleVoices.find(
        (voice) => voice.lang.startsWith(languagePrefix)
      ) || availableVoices.find(
        (voice) => voice.lang === languageCodes[language]
      ) || availableVoices.find(
        (voice) => voice.lang.startsWith(languagePrefix)
      ) || null;
    }
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    // Speak the text
    window.speechSynthesis.speak(utterance);
  }, [selectedVoice]);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  // Get female voices for selection
  const getFemaleVoices = useCallback(() => {
    const availableVoices = window.speechSynthesis.getVoices();
    return availableVoices.filter((voice) => {
      const name = voice.name.toLowerCase();
      // Exclude obvious male indicators
      const isNotMale = !name.includes('male') && !name.includes('david') && 
                       !name.includes('daniel') && !name.includes('james') &&
                       !name.includes('john') && !name.includes('mark');
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
                      name.includes('tessa') || name.includes('samantha');
      
      return isFemale || isNotMale;
    });
  }, []);

  return { speak, stop, isSupported, voices, getFemaleVoices };
}

