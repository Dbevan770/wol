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

    return setResponse.success;
  };

  const readBucket = async <TKey extends StorageKey<TStorage>>(
    bucketKey: TKey,
  ): Promise<TStorage[TKey]> => {
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
  };

  const readAllBuckets = async (): Promise<TStorage | null> => {
    const response = await getAllBuckets<TStorage>();

    if (!response.success) {
      throw new Error('Failed to read all buckets...');
    }

    if (!response.data) {
      throw new Error('No data was returned...');
    }

    return response.data;
  };

  const updateBucket = async <TKey extends StorageKey<TStorage>>(
    bucketKey: TKey,
    newData: Partial<TStorage[TKey]>,
  ): Promise<boolean> => {
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
    const parsedBucketData = JSON.parse(bucketData) as TStorage[TKey];

    // Append the new data to the existing data
    const updatedBucketData = { ...parsedBucketData, ...newData };

    // set the bucket data
    const setResponse = await setBucket(bucketKey, updatedBucketData);

    if (!setResponse.success) {
      throw new Error(`Failed to update bucket with key '${bucketKey}'...`);
    }

    // set bucket returns no data, so if it was successful, we can just return true
    return response.success;
  };

  const deleteBucket = async <TKey extends StorageKey<TStorage>>(
    bucketKey: TKey,
  ): Promise<boolean> => {
    const response = await removeData(bucketKey);

    if (!response.success) {
      throw new Error(`Failed to delete bucket with key '${bucketKey}'...`);
    }

    return response.success;
  };

  return {
    createBucket,
    readBucket,
    readAllBuckets,
    updateBucket,
    deleteBucket,
  };
};
