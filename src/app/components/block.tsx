import * as React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Card, CardTitle, CardHeader } from './ui/card';

interface BlockProps {
  title: string;
  children: React.ReactNode;
}

export const Block: React.FC<BlockProps> = ({ title, children }) => {
  return (
    <Card className=''>
      <Accordion collapsible type='single' defaultValue={title}>
        <AccordionItem value={title} className='border-none'>
          <AccordionTrigger className='font-semibold leading-none tracking-tight text-base p-6 hover:no-underline'>
            <CardHeader className='p-0'>
              <CardTitle className='font-semibold leading-none tracking-tight'>{title}</CardTitle>
            </CardHeader>
          </AccordionTrigger>
          <AccordionContent className='p-6 pt-0'>{children}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
