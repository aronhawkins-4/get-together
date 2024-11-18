'use client';
import { Button } from '@/components/ui/button';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { createVote } from '../actions/votes/createVote';

import { Tables } from '../types/supabase.types';
import { updateVote } from '../actions/votes/updateVote';
import { createClient } from '../utils/supabase/client';
import { getVotes } from '../actions/votes/getVotes';

interface VoteButtonsProps {
  eventId: number;
}

export const VoteButtons = ({ eventId }: VoteButtonsProps) => {
  //   const [upvotes, setUpvotes] = useState(0);
  //   const [downvotes, setDownvotes] = useState(0);
  const [currentVote, setCurrentVote] = useState<Tables<'votes'> | null>(null);

  const handleVote = async (value: 'up' | 'down') => {
    if (currentVote) {
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
  };

  useEffect(() => {
    (async () => {
      const { data, error } = await getVotes(eventId);
      if (error) {
        console.error(error);
      }
      if (!data) return;
      setCurrentVote(data?.[0]);
    })();
  }, [eventId]);
  return (
    <div className='flex gap-2'>
      <Button variant='outline' size='icon' className='w-8 h-8' onClick={() => handleVote('up')}>
        <ThumbsUp className={`w-4 ${currentVote?.value === 'up' ? 'text-green-500' : ''}`} />
      </Button>
      <Button variant='outline' size='icon' className='w-8 h-8' onClick={() => handleVote('down')}>
        <ThumbsDown className={`w-4 ${currentVote?.value === 'down' ? 'text-red-500' : ''}`} />
      </Button>
    </div>
  );
};
