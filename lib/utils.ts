import { getLanguageData, type Language } from './languageData';

/**
 * Get all unique categories available for a language
 */
export function getCategories(language: Language): string[] {
  const data = getLanguageData(language);
  const categories = new Set<string>();
  
  data.flashcards.forEach((card) => {
    if (card.category) {
      categories.add(card.category);
    }
  });
  
  return Array.from(categories).sort();
}

/**
 * Get flashcards filtered by categories
 */
export function filterFlashcardsByCategories(
  language: Language,
  selectedCategories: string[]
): ReturnType<typeof getLanguageData>['flashcards'] {
  const data = getLanguageData(language);
  
  if (selectedCategories.length === 0) {
    return data.flashcards;
  }
  
  return data.flashcards.filter((card) => 
    card.category && selectedCategories.includes(card.category)
  );
}

