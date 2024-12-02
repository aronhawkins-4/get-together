import { Button } from '@/app/components/ui/button';
import { DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose, Drawer } from '@/app/components/ui/drawer';
import { Plus } from 'lucide-react';
import React from 'react';

export const ScheduleDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger>
        <Plus />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className='flex flex-row gap-2'>
          <Button className='w-full'>Submit</Button>
          <DrawerClose className='w-full'>
            <Button variant='outline' className='w-full'>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
