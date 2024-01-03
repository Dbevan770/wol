import {
  getBucket,
  setBucket,
  getAllBuckets,
  removeData,
} from '@/lib/AsyncStorage/api';

import type { Storage, StorageKey } from '@/lib/AsyncStorage';

export const useAsyncStorage = <TStorage extends Storage>() => {
  const createBucket = async <TKey extends StorageKey<TStorage>>(
    bucketKey: TKey,
    newData: TStorage[TKey],
  ): Promise<boolean> => {
    try {
      const response = await getBucket<TStorage>(bucketKey);

      if (response.success) {
        throw new Error(
          `Bucket with key '${bucketKey}' already exists... Try updating it instead.`,
        );
      }

      const setResponse = await setBucket(bucketKey, newData);

      if (!setResponse.success) {
        throw new Error(`Failed to create bucket with key '${bucketKey}'...`);
      }

      console.log(`Successfully created bucket with key '${bucketKey}'`);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const readBucket = async <TKey extends StorageKey<TStorage>>(
    bucketKey: TKey,
  ): Promise<TStorage[TKey] | null> => {
    try {
      const response = await getBucket<TStorage>(bucketKey);

      if (!response.success) {
        throw new Error(
          `Bucket with key '${bucketKey}' does not exist... Try creating it instead.`,
        );
      }

      if (!response.data) {
        throw new Error(`Bucket with key '${bucketKey}' returned no data...`);
      }

      // bucketData is returned as a string and must be parsed
      const bucketData = response.data;

      // parse the string to conform to the type of the bucket
      const parsedBucketData = JSON.parse(bucketData) as TStorage[TKey];

      return parsedBucketData;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const updateBucket = async (
    bucketKey: StorageKey<TStorage>,
    newData: Partial<TStorage[StorageKey<TStorage>]>,
  ): Promise<boolean> => {
    try {
      const response = await getBucket(bucketKey);

      if (!response.success) {
        throw new Error(
          `Bucket with key '${bucketKey}' does not exist... Try creating it instead.`,
        );
      }

      if (!response.data) {
        throw new Error(`Bucket with key '${bucketKey}' returned no data...`);
      }

      // bucketData is returned as a string and must be parsed
      const bucketData = response.data;

      // parse the string to conform to the type of the bucket
      const parsedBucketData: TStorage[StorageKey<TStorage>] = JSON.parse(
        bucketData,
      ) as TStorage[StorageKey<TStorage>];

      // Append the new data to the existing data
      const updatedBucketData = { ...parsedBucketData, ...newData };

      // set the bucket data
      const setResponse = await setBucket(bucketKey, updatedBucketData);

      if (!setResponse.success) {
        throw new Error(`Failed to update bucket with key '${bucketKey}'...`);
      }

      // set bucket returns no data, so if it was successful, we can just return true
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return {
    createBucket,
    readBucket,
    updateBucket,
  };
};
