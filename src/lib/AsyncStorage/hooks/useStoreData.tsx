import { storeData } from '@/lib/AsyncStorage/api';

import type { APIDataBase, APIOptions } from '@/lib/AsyncStorage/types';

export const useStoreData = <TData extends APIDataBase>() => {
  return async (key: string, data: TData, options?: APIOptions) => {
    return storeData<TData>(key, data, options);
  };
};
