import type {
  APIResponse,
  APIOptions,
  BucketValue,
  BucketValues,
} from '@/lib/AsyncStorage/types';

import { APIError } from '@/lib/AsyncStorage/types';

import {
  getAllBucketKeys,
  multiGetBuckets,
  handleError,
} from '@/lib/AsyncStorage/utils';

export const getAllBuckets = async <TValue = unknown>(
  options?: Partial<APIOptions>,
): Promise<APIResponse> => {
  const { verbose = false } = options ?? {};

  try {
    // Get all bucket keys stored on the device and return
    // them as an array -- i.e ['devices', 'settings', ...]
    const bucketKeys = await getAllBucketKeys();

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
    const buckets = await multiGetBuckets(bucketKeys);

    /*
     * Filter out any null values and map over the array
     * to parse the JSON strings and return an array of objects.
     */

    const items: BucketValues<TValue> = buckets
      .filter(bucket => bucket[1] !== null)
      .map(bucket => {
        const [key, value] = bucket;
        try {
          const item: BucketValue<TValue> = JSON.parse(
            value,
          ) as BucketValue<TValue>;
          return item;
        } catch (e) {
          console.error(`Error parsing data for key ${key}:`, e);
          return null;
        }
      })
      .filter((item): item is BucketValue<TValue> => item !== null);

    return {
      success: true,
      data: items,
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
