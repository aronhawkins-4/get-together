import { Button } from '@/components/ui/button';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import React, { useState } from 'react';

export const VoteButtons = () => {
  //   const [upvotes, setUpvotes] = useState(0);
  //   const [downvotes, setDownvotes] = useState(0);
  const [vote, setVote] = useState<null | 'up' | 'down'>(null);
  return (
    <div className='flex gap-2'>
      <Button variant='outline' size='icon' className='w-8 h-8' onClick={() => setVote((current) => (current === 'up' ? null : 'up'))}>
        <ThumbsUp className={`w-4 ${vote === 'up' ? 'text-green-500' : ''}`} />
      </Button>
      <Button variant='outline' size='icon' className='w-8 h-8' onClick={() => setVote((current) => (current === 'down' ? null : 'down'))}>
        <ThumbsDown className={`w-4 ${vote === 'down' ? 'text-red-500' : ''}`} />
      </Button>
    </div>
  );
};
