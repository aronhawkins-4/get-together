'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/app/components/ui/dropdown-menu';

import { LogIn, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Database } from '../types/supabase.types';

interface UserMenuProps {
  user: Database['public']['Tables']['users']['Row'] | null;
}

export const UserMenu = ({ user }: UserMenuProps) => {
  const router = useRouter();

  const handleSignOut = async () => {
    router.push('/auth/signout');
  };

  if (!user) {
    return (
      <Link href='/login' className='flex gap-2 items-center'>
        <LogIn className='w-4 h-4' />
        Login
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='rounded-full'>
        <Avatar>
          <AvatarImage src={user.profile_image || ''} />
          <AvatarFallback>
            {user.first_name && user.last_name
              ? `${user.first_name?.at(0)?.toUpperCase()}${user.last_name?.at(0)?.toUpperCase()}`
              : `${user.email?.at(0)?.toUpperCase()}${user.email?.at(1)?.toUpperCase()}`}
          </AvatarFallback>
        </Avatar>
        {/* <CircleUser className='w-full h-full' /> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className='w-4 h-4' />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
