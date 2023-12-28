import AsyncStorage from '@react-native-async-storage/async-storage';

import type { APIResponse, APIOptions } from '@/lib/AsyncStorage/types';

import { handleError } from '@/lib/AsyncStorage/utils';

export const removeData = async (
  key: string,
  options?: Partial<APIOptions>,
): Promise<APIResponse> => {
  const { verbose = false } = options ?? {};

  try {
    await AsyncStorage.removeItem(key);

    return {
      success: true,
      data: null,
      error: null,
      ...(verbose && {
        statusMsg: 'Data successfully removed from the device.',
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
