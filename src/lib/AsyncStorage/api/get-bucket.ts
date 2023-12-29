import type {
  APIResponse,
  APIOptions,
  BucketKey,
  BucketValue,
} from '@/lib/AsyncStorage/types';

import { APIError } from '@/lib/AsyncStorage/types';

import { getBucketJSON, handleError } from '@/lib/AsyncStorage/utils/';

export const getBucket = async <TData = unknown>(
  bucketKey: BucketKey,
  options?: Partial<APIOptions>,
): Promise<APIResponse<TData>> => {
  try {
    const bucketJSON = await getBucketJSON(bucketKey);
    if (bucketJSON === null) {
      throw new APIError({
        name: 'NOT_FOUND',
        message: `Bucket with key '${bucketKey}' does not exist.`,
        statusCode: 404,
      });
    }

    const bucket: BucketValue<TData> = JSON.parse(bucketJSON) as TData;

    return {
      success: true,
      data: bucket,
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
