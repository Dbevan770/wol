import type {
  APIResponse,
  APIOptions,
  BucketKey,
} from '@/lib/AsyncStorage/types';

import { setBucket, handleError } from '@/lib/AsyncStorage/utils';

export const setBucketData = async <TValue = unknown>(
  bucketKey: BucketKey,
  value: TValue,
  options?: Partial<APIOptions>,
): Promise<APIResponse<TValue>> => {
  const { verbose = false } = options ?? {};

  try {
    // Convert passed in value to a JSON string
    const bucketValue = JSON.stringify(value);

    // Save the JSON string to the matching bucket
    // key in the device storage.
    await setBucket(bucketKey, bucketValue);

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
