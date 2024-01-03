import type { APIResponse, APIOptions } from '@/lib/AsyncStorage/types';

import { APIError, Storage, StorageKey } from '@/lib/AsyncStorage/types';

import { getBucketJSON, handleError } from '@/lib/AsyncStorage/utils/';

export const getBucket = async <TStorage extends Storage>(
  bucketKey: StorageKey<TStorage>,
  options?: Partial<APIOptions>,
): Promise<APIResponse<string>> => {
  try {
    const bucketJSON = await getBucketJSON(bucketKey);
    if (bucketJSON === null) {
      throw new APIError({
        name: 'NOT_FOUND',
        message: `Bucket with key '${bucketKey}' does not exist.`,
        statusCode: 404,
      });
    }

    return {
      success: true,
      data: bucketJSON,
      error: null,
      ...(options?.verbose && {
        statusMsg: `Retrieved bucket '${bucketKey}' from the device storage successfully.`,
      }),
    };
  } catch (e) {
    const error = handleError(e);

    return {
      success: false,
      data: null,
      error: error,
      ...(options?.verbose && {
        statusMsg: 'Please contact the developer to submit a bug report.',
      }),
    };
  }
};
