'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/app/components/ui/dropdown-menu';
import { User as UserType } from '@supabase/supabase-js';
import { CircleUser, LogIn, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
  user: UserType | null;
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
      <DropdownMenuTrigger>
        <CircleUser className='w-full h-full' />
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

  //   return <LogOut className='w-full h-full cursor-pointer' onClick={handleSignOut} />;
};
