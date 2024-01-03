import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyValuePair } from '@react-native-async-storage/async-storage/lib/typescript/types';

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

export const getAllBucketKeys = async (): Promise<readonly string[]> => {
  return await getAllKeys();
};

export const getBucketJSON = async (
  bucketKey: string,
): Promise<string | null> => {
  return await getItem(bucketKey);
};

export const removeBucket = async (bucketKey: string): Promise<void> => {
  return await removeItem(bucketKey);
};

export const setBucketData = async (
  bucketKey: string,
  bucketJSON: string,
): Promise<void> => {
  return await setItem(bucketKey, bucketJSON);
};

export const mergeBucket = async (
  bucketKey: string,
  jsonValue: string,
): Promise<void> => {
  return await mergeItem(bucketKey, jsonValue);
};

export const multiGetBuckets = async (
  bucketKeys: string[],
): Promise<readonly KeyValuePair[]> => {
  return await multiGet(bucketKeys);
};

export const multiRemoveBuckets = async (
  bucketKeys: string[],
): Promise<void> => {
  return await multiRemove(bucketKeys);
};

export const multiSetBuckets = async (
  buckets: [string, string][],
): Promise<void> => {
  return await multiSet(buckets);
};

export const multiMergeBuckets = async (
  buckets: [string, string][],
): Promise<void> => {
  return await multiMerge(buckets);
};
