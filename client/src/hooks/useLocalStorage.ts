/**
 * Custom hook for localStorage with type safety
 */

import { useState, useEffect, useCallback } from "react";

/**
 * Hook for managing state that persists to localStorage
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  // Initialize state from localStorage or use initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

/**
 * Hook for simple boolean localStorage toggle
 */
export function useLocalStorageBoolean(
  key: string,
  initialValue: boolean,
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useLocalStorage(key, initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, [setValue]);

  return [value, toggle, setValue];
}
