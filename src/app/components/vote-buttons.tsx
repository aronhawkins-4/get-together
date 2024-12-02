'use client';
import { Button } from '@/app/components/ui/button';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { createVote } from '../functions/actions/votes/createVote';

import { Tables } from '../types/supabase.types';
import { updateVote } from '../functions/actions/votes/updateVote';
import { deleteVote } from '../functions/actions/votes/deleteVote';
import { createClient } from '../utils/supabase/client';
import { useVotes } from '../hooks/useVotes';
import { User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

interface VoteButtonsProps {
  eventId: number;
}

export const VoteButtons = ({ eventId }: VoteButtonsProps) => {
  //   const [upvotes, setUpvotes] = useState(0);
  //   const [downvotes, setDownvotes] = useState(0);
  const [currentVote, setCurrentVote] = useState<Tables<'votes'> | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const { votes, isLoading, error } = useVotes(eventId);
  const supabase = createClient();
  const { toast } = useToast();

  const handleVote = async (value: 'up' | 'down') => {
    try {
      if (currentVote) {
        if (currentVote.value === value) {
          const { error } = await deleteVote(currentVote.id);
          if (error) {
            console.error(error);
          }
          setCurrentVote(null);
          return;
        }
        const { data, error } = await updateVote({ voteId: currentVote.id, value });
        if (error) {
          console.error(error);
        }
        setCurrentVote(data);
        return;
      } else {
        const { data, error } = await createVote({ eventId, value });
        if (error) {
          console.error(error);
        }
        setCurrentVote(data);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast({
        title: 'Error',
        description: error?.message,
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    };
    fetchUser();
  }, [supabase]);

  useEffect(() => {
    if (!votes || !user) return;
    const userVote = votes.find((vote) => vote.user === user?.id);
    if (!userVote) return;
    setCurrentVote(userVote);
  }, [eventId, votes, user]);
  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    }
  }, [error]);
  return (
    <div className='flex gap-2'>
      <Button variant='outline' size='icon' className='w-8 h-8' onClick={() => handleVote('up')}>
        <ThumbsUp className={`w-4 ${currentVote?.value === 'up' ? 'text-green-500' : ''} ${isLoading ? 'text-muted-foreground' : ''}`} />
      </Button>
      <Button variant='outline' size='icon' className='w-8 h-8' onClick={() => handleVote('down')}>
        <ThumbsDown className={`w-4 ${currentVote?.value === 'down' ? 'text-red-500' : ''} ${isLoading ? 'text-muted-foreground' : ''}`} />
      </Button>
    </div>
  );
};
