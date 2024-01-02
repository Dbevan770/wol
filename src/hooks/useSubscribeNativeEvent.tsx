import { NativeEventEmitter } from 'react-native';
import type { NativeModule, EmitterSubscription } from 'react-native';

type ListenerProps = {
  eventType: string;
  listener: (event: any) => void;
  context?: any;
};

type SubscribeProps = {
  module: NativeModule;
  listener: ListenerProps;
};

export const useSubscribeNativeEvent = () => {
  let observer: NativeEventEmitter;

  const subscribe = ({
    module,
    listener,
  }: SubscribeProps): EmitterSubscription => {
    const { eventType, listener: _listener, context } = listener;
    if (!eventType || !listener) {
      throw new Error('Event type and listener are required!');
    }
    observer = new NativeEventEmitter(module);

    if (!observer) {
      throw new Error('Provided module was null!');
    }

    return observer.addListener(eventType, _listener, context);
  };

  const unsubscribe = (listener: EmitterSubscription) => {
    listener.remove();
  };

  return {
    subscribe,
    unsubscribe,
  };
};
