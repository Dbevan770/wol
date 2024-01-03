import type {
  APIResponse,
  APIOptions,
  Storage,
  StorageKey,
} from '@/lib/AsyncStorage/types';

import { setBucketData, handleError } from '@/lib/AsyncStorage/utils';

export const setBucket = async <TStorage extends Storage>(
  bucketKey: StorageKey<TStorage>,
  value: TStorage[StorageKey<TStorage>],
  options?: Partial<APIOptions>,
): Promise<APIResponse<null>> => {
  const { verbose = false } = options ?? {};

  try {
    // Convert passed in value to a JSON string
    const bucketValue = JSON.stringify(value);

    // Save the JSON string to the matching bucket
    // key in the device storage.
    await setBucketData(bucketKey, bucketValue);

    // setBucket() does not return anything, so we
    // return a success response here and no data.
    return {
      success: true,
      data: null,
      error: null,
      ...(verbose && { statusMsg: 'Data successfully saved to the device.' }),
    };
  } catch (e) {
    const error = handleError(e);

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
