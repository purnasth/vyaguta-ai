/**
 * Custom hook for managing quick questions
 */

import { useState, useEffect, useCallback } from "react";
import type { QuickQuestion } from "../types";
import { chatApi } from "../services/api";
import { ERROR_MESSAGES } from "../constants";

interface UseQuickQuestionsReturn {
  quickQuestions: QuickQuestion[];
  isLoading: boolean;
  error: Error | null;
  getSurpriseQuestion: (index?: number) => Promise<string | null>;
}

export function useQuickQuestions(): UseQuickQuestionsReturn {
  const [quickQuestions, setQuickQuestions] = useState<QuickQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load quick questions on mount
  useEffect(() => {
    let mounted = true;

    const loadQuestions = async () => {
      try {
        setIsLoading(true);
        const questions = await chatApi.getQuickQuestions();
        if (mounted) {
          setQuickQuestions(questions);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(
            err instanceof Error ? err : new Error("Failed to load questions"),
          );
          console.error("Failed to load quick questions:", err);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadQuestions();

    return () => {
      mounted = false;
    };
  }, []);

  // Get surprise question
  const getSurpriseQuestion = useCallback(
    async (index?: number): Promise<string | null> => {
      try {
        return await chatApi.getSurpriseQuestion(index);
      } catch (error) {
        console.error(ERROR_MESSAGES.SURPRISE_QUESTION, error);
        return null;
      }
    },
    [],
  );

  return {
    quickQuestions,
    isLoading,
    error,
    getSurpriseQuestion,
  };
}
