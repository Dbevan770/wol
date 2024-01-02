import { useState } from 'react';
import { useAppDispatch } from '@/stores';
import { forgetDevice as rtkForgetDevice } from '@/slices/DevicesSlice';

export const useForgetDevice = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();

  const forgetDevice = async (deviceId: string) => {
    setIsLoading(true);

    console.log('forgetting device...');
    try {
      await dispatch(rtkForgetDevice(deviceId)).unwrap();
      console.log('device forgotten!');
    } catch (err) {
      setIsError(true);
      setError(err as string);
      setIsLoading(false);
      console.error(err);
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

  return {
    forgetDevice,
    isLoading,
    isError,
    isSuccess,
    error,
    reset,
  };
};
