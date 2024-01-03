import type { APIResponse, APIOptions } from '@/lib/AsyncStorage/types';

import { APIError, Storage } from '@/lib/AsyncStorage/types';

import {
  getAllBucketKeys,
  multiGetBuckets,
  handleError,
} from '@/lib/AsyncStorage/utils';

export const getAllBuckets = async <TStorage extends Storage>(
  options?: Partial<APIOptions>,
): Promise<APIResponse<TStorage>> => {
  const { verbose = false } = options ?? {};

  try {
    // Get all bucket keys stored on the device and return
    // them as an array -- i.e ['devices', 'settings', ...]
    const keys = await getAllBucketKeys();

    // getAllBucketKeys returns a readonly array, so we
    // make a copy of the array using the spread operator.
    const bucketKeys = [...keys];

    // If there are no bucket keys, throw an error that no
    // buckets were found on the device.
    if (bucketKeys.length === 0) {
      throw new APIError({
        name: 'NOT_FOUND',
        message: 'No buckets were found on this device.',
        statusCode: 404,
      });
    }

    // Get all of the buckets from the device storage
    // using the bucket keys array
    const keyValuePairs = await multiGetBuckets(bucketKeys);

    const bucketValuePairs = [...keyValuePairs];

    const buckets: TStorage = bucketValuePairs.reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: JSON.parse(value ?? '{}'),
      }),
      {} as TStorage,
    );

    return {
      success: true,
      data: buckets,
      error: null,
      ...(verbose && {
        statusMsg:
          'Retrieved all data from the device storage buckets successfully.',
      }),
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
