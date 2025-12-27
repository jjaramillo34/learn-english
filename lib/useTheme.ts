'use client';

import { useState, useEffect, useCallback } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  const applyTheme = useCallback((newTheme: 'light' | 'dark') => {
    if (typeof document === 'undefined') return;
    
    const root = document.documentElement;
    // Remove dark class first
    root.classList.remove('dark');
    // Only add dark class if theme is dark
    if (newTheme === 'dark') {
      root.classList.add('dark');
    }
    // Force a reflow to ensure the class change is applied
    root.offsetHeight;
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    // Apply theme immediately
    applyTheme(initialTheme);
    setTheme(initialTheme);
    setMounted(true);
  }, [applyTheme]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      
      // Apply theme to DOM immediately
      applyTheme(newTheme);
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
      }
      
      return newTheme;
    });
  }, [applyTheme]);

  return { theme, toggleTheme, mounted };
}

