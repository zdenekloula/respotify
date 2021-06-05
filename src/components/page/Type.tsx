import React from 'react';
import { Heading } from '@/components/heading';

export const PageType: React.FC = ({ children }) => {
  return (
    <Heading as="h2" type="heading02" size="1" weight="bold" uppercase>
      {children}
    </Heading>
  );
};
