import { useContext } from 'react';
import { DevicesContext } from '@/stores';

export const useDevicesContext = () => {
  const context = useContext(DevicesContext);

  if (!context) {
    throw new Error('useDevicesContext must be used within a DevicesProvider');
  }

  return context;
};
