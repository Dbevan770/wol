import { useEffect } from 'react';
import { NativeEventEmitter } from 'react-native';
import { useAppDispatch } from '@/stores';
import { fetchDevices } from '@/slices/DevicesSlice';

import { useInitialSetup, useSubscribeNativeEvent } from '@/hooks';

import { PathMonitor } from '@/modules';

import RNEventEmitter from '@/modules/EventEmitter';

type NetworkEvent = {
  success: boolean;
  payload?: unknown;
  error?: unknown;
};

export const InitialLoad = () => {
  const dispatch = useAppDispatch();
  const initialSetup = useInitialSetup();
  const { subscribe, unsubscribe } = useSubscribeNativeEvent();

  const subscription = subscribe({
    module: RNEventEmitter,
    listener: {
      eventType: 'Networking',
      listener: (event: NetworkEvent) => {
        if (!event) return;

        if (!event.success) {
          console.error(
            `[NETWORK ERROR] -- ${
              event.error
                ? event.error
                : 'Operation was unsuccessful due to an unknown error.'
            }`,
          );
          return;
        }

        console.log(
          `[NETWORK SUCCESS] -- ${
            event.payload
              ? event.payload
              : 'Operation was successful but not payload was provided.'
          }`,
        );
      },
    },
  });

  PathMonitor.initPathMonitor();

  useEffect(() => {
    const doSetup = async () => {
      await initialSetup.checkIfFirstLaunch();

      dispatch(fetchDevices());
    };

    doSetup();
  }, []);

  useEffect(() => {
    return () => {
      unsubscribe(subscription);
    };
  }, []);

  return <></>;
};
