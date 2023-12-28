import { removeData } from '@/lib/AsyncStorage/api';

import type { APIOptions } from '@/lib/AsyncStorage/types';

export const useRemoveData = () => {
  return async (key: string, options?: Partial<APIOptions>) => {
    return await removeData(key, options);
  };
};
