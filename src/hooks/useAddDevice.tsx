import { useState } from 'react';
import { useAppDispatch } from '@/stores';
import { addDevice as rtkAddDevice } from '@/slices/DevicesSlice';
import { createDevice } from '@/features/devices/utils';

import type { NewDevice } from '@/types';

export const useAddDevice = () => {
  // Redux
  const dispatch = useAppDispatch();

  // Boolean states
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Strings
  const [error, setError] = useState('');

  // Functions
  const addDevice = async (newDevice: NewDevice) => {
    setIsLoading(true);

    const device = createDevice(newDevice);

    try {
      await dispatch(rtkAddDevice(device)).unwrap();
    } catch (err) {
      setIsError(true);
      setError(err as string);
      setIsLoading(false);
      return;
    }

    setIsSuccess(true);
    setIsLoading(false);
  };

  const reset = () => {
    setIsLoading(false);
    setIsError(false);
    setIsSuccess(false);
    setError('');
  };

  // Return
  return {
    addDevice,
    isLoading,
    isError,
    isSuccess,
    error,
    reset,
  };
};
