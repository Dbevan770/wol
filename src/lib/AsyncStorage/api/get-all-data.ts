import AsyncStorage from '@react-native-async-storage/async-storage';

import type {
  APIDataBase,
  APIResponse,
  APIOptions,
} from '@/lib/AsyncStorage/types';

import { handleError } from '@/lib/AsyncStorage/utils';

export const getAllData = async <TData extends APIDataBase>(
  options?: Partial<APIOptions>,
): Promise<APIResponse<TData[]>> => {
  const { verbose = false } = options ?? {};

  try {
    // Get all the keys and store them in an array
    const keys = await AsyncStorage.getAllKeys();
    const data = await AsyncStorage.multiGet(keys);

    /*
     * Filter out any null values and map over the array
     * to parse the JSON data and return an array of
     * devices
     */

    const items: TData[] = data
      .filter(item => item[1] !== null)
      .map(item => {
        const [key, value] = item;
        try {
          const item = JSON.parse(value!) as TData;
          return item;
        } catch (e) {
          console.error(`Error parsing data for key ${key}:`, e);
          return null;
        }
      })
      .filter((item): item is TData => item !== null);

    return {
      success: true,
      data: items,
      error: null,
      ...(verbose && {
        statusMsg: 'Retrieved all keys from the device storage successfully.',
      }),
    };
  } catch (e) {
    const error = handleError(e, 500);

    return {
      success: false,
      data: null,
      error: error,
      ...(verbose && {
        statusMsg: 'Please contact the developer to submit a bug report.',
      }),
    };
  }
};
