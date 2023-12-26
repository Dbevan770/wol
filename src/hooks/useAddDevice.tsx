import { useState } from 'react';
import { useDevicesContext } from './useDevicesContext';

import { Device, type NewDevice } from '@/types';

export const useAddDevice = () => {
  // Context
  const { addDevice: ctxAddDevice } = useDevicesContext();

  // Boolean states
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Strings
  const [error, setError] = useState('');

  // Data
  const [device, setDevice] = useState<Device | null>(null);

  // Functions
  const addDevice = async (newDevice: NewDevice) => {
    setIsLoading(true);

    const response = await ctxAddDevice(newDevice);

    if ('error' in response) {
      setIsError(true);
      setError(response.error as string);
      setIsLoading(false);
      return;
    }

    setIsSuccess(true);
    setDevice(response.data as Device);
    setIsLoading(false);
  };

  const reset = () => {
    setIsLoading(false);
    setIsError(false);
    setIsSuccess(false);
    setError('');
    setDevice(null);
  };

  // Return
  return {
    addDevice,
    isLoading,
    isError,
    isSuccess,
    error,
    device,
    reset,
  };
};
