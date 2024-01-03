import { useContext } from 'react';

import { ToastContext } from '@/lib/Toast/context';

export const useToast = () => {
  const context = useContext(ToastContext);

  if (context === null) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }

  return context;
};
