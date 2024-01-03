import type { ToastOptions, ToastProps } from './toast';

export type ToastContextType = {
  toasts: ToastProps[];
  showToast: (
    message: string,
    options?: Partial<ToastOptions> | undefined,
  ) => void;
};
