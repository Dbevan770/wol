import { useContext } from 'react';
import { StackContext } from '@/lib/stack-navigator';

export const useStackContext = () => {
  const context = useContext(StackContext);

  if (context === null) {
    throw new Error('useStackContext must be use within a StackProvider');
  }

  return context;
};
