import type {
  APIResponse,
  APIOptions,
  BucketKey,
} from '@/lib/AsyncStorage/types';

import { removeBucket, handleError } from '@/lib/AsyncStorage/utils';

export const removeData = async (
  bucketKey: BucketKey,
  options?: Partial<APIOptions>,
): Promise<APIResponse> => {
  const { verbose = false } = options ?? {};

  try {
    await removeBucket(bucketKey);

    return {
      success: true,
      data: null,
      error: null,
      ...(verbose && {
        statusMsg: 'Data successfully removed from the device.',
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
