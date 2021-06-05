import React from 'react';
import { PageContentSectionHeading } from '@/components/page';

const getGreetingMessage = () => {
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    return 'Good morning';
  }
  if (currentHour < 18) {
    return 'Good afternoon';
  }

  return 'Good evening';
};

export const Greeting = () => {
  const message = getGreetingMessage();
  return (
    <PageContentSectionHeading
      css={{
        fontSize: '$fontSize07',
        marginBlockEnd: '$spacing07',
      }}
    >
      {message}
    </PageContentSectionHeading>
  );
};
