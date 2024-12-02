'use client';

import { useEffect, useState } from 'react';
import { Tables } from '../types/supabase.types';

export const useVotes = (eventId: number) => {
  const [votes, setVotes] = useState<Tables<'votes'>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/votes/${eventId}`, {
          cache: 'force-cache',
        });
        const result = await response.json();

        if (result.error) {
          setError(result.error);
          return;
        }

        setVotes(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch votes');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVotes();
  }, [eventId]);

  return { votes, isLoading, error };
};
