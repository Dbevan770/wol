import AsyncStorage from '@react-native-async-storage/async-storage';

import type {
  APIDataBase,
  APIResponse,
  APIOptions,
} from '@/lib/AsyncStorage/types';

import { handleError } from '@/lib/AsyncStorage/utils';

export const storeData = async <TData extends APIDataBase>(
  key: string,
  data: TData,
  options?: Partial<APIOptions>,
): Promise<APIResponse<TData>> => {
  const { verbose = false } = options ?? {};
  let response: APIResponse<TData>;

  try {
    const item: TData = {
      ...data,
    };

    // Convert the device object to JSON and store
    // it in AsyncStorage using the UUID as the key
    const jsonValue = JSON.stringify(item);
    await AsyncStorage.setItem(key, jsonValue);

    return (response = {
      success: true,
      data: item,
      error: null,
      ...(verbose && { statusMsg: 'Data successfully saved to the device.' }),
    });
  } catch (e) {
    const error = handleError(e, 500);

    return (response = {
      success: false,
      data: null,
      error: error,
      ...(verbose && {
        statusMsg: 'Please contact the developer to submit a bug report.',
      }),
    });
  }
};
