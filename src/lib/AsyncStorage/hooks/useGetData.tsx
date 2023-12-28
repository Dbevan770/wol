import { getData } from '@/lib/AsyncStorage/api';

import type { APIOptions } from '@/lib/AsyncStorage/types';

export const useGetData = () => {
  return async (key: string, options?: Partial<APIOptions>) => {
    return await getData(key, options);
  };
};
