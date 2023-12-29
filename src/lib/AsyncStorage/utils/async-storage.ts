import AsyncStorage from '@react-native-async-storage/async-storage';

import type {
  BucketKey,
  BucketKeys,
  RawBuckets,
  BucketJSON,
} from '../types/storage';

const {
  clear,
  flushGetRequests,
  getAllKeys,
  getItem,
  removeItem,
  setItem,
  mergeItem,
  multiGet,
  multiRemove,
  multiSet,
  multiMerge,
} = AsyncStorage;

export const clearAll = async (): Promise<void> => {
  return await clear();
};

export const flush = (): void => {
  return flushGetRequests();
};

export const getAllBucketKeys = async (): Promise<BucketKeys> => {
  return (await getAllKeys()) as BucketKeys;
};

export const getBucketJSON = async (
  bucketKey: BucketKey,
): Promise<string | null> => {
  return await getItem(bucketKey);
};

export const removeBucket = async (bucketKey: BucketKey): Promise<void> => {
  return await removeItem(bucketKey);
};

export const setBucket = async (
  bucketKey: BucketKey,
  bucketJSON: BucketJSON,
): Promise<void> => {
  return await setItem(bucketKey, bucketJSON);
};

export const mergeBucket = async (
  bucketKey: BucketKey,
  jsonValue: string,
): Promise<void> => {
  return await mergeItem(bucketKey, jsonValue);
};

export const multiGetBuckets = async (
  bucketKeys: BucketKeys,
): Promise<RawBuckets> => {
  return (await multiGet(bucketKeys)) as RawBuckets;
};

export const multiRemoveBuckets = async (
  bucketKeys: BucketKeys,
): Promise<void> => {
  return await multiRemove(bucketKeys);
};

export const multiSetBuckets = async (buckets: RawBuckets): Promise<void> => {
  return await multiSet(buckets);
};

export const multiMergeBuckets = async (buckets: RawBuckets): Promise<void> => {
  return await multiMerge(buckets);
};
