import { getAllData } from '@/lib/AsyncStorage/api';

import type { APIOptions } from '@/lib/AsyncStorage/types';

export const useGetAllData = () => {
  return async (options?: Partial<APIOptions>) => {
    return await getAllData(options);
  };
};
