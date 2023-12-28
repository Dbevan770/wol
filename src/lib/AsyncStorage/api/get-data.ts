import AsyncStorage from '@react-native-async-storage/async-storage';

import type {
  APIDataBase,
  APIResponse,
  APIOptions,
} from '@/lib/AsyncStorage/types';

import { handleError } from '@/lib/AsyncStorage/utils';

export const getData = async <TData extends APIDataBase>(
  key: string,
  options?: Partial<APIOptions>,
): Promise<APIResponse<TData>> => {
  const { verbose = false } = options ?? {};

  try {
    const data = await AsyncStorage.getItem(key);

    if (data === null)
      throw new Error(`Could not find any data with provided key -- (${key}):`);

    try {
      const item = JSON.parse(data) as TData;

      return {
        success: true,
        data: item,
        error: null,
        ...(verbose && {
          statusMsg: 'Successfully found key matching provided value.',
        }),
      };
    } catch (e) {
      const error = handleError(e, 400);

      return {
        success: false,
        data: null,
        error: error,
        ...(verbose && {
          statusMsg: 'Please contact the developer to submit a bug report.',
        }),
      };
    }
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
