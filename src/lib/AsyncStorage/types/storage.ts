/* This file defines the types used in the AsyncStorage API.
 * The storage bucket type is derived as a key of the STORAGE_BUCKETS
 * constant. This allows the expansion of storage buckets by simply
 * adding a new key to the STORAGE_BUCKETS constant.
 */

import { STORAGE_BUCKETS } from '@/lib/AsyncStorage/types/constants';

export type StorageBuckets = Readonly<typeof STORAGE_BUCKETS>;

export type StorageBucketKey = Readonly<keyof StorageBuckets>;

export type BucketKey = StorageBuckets[StorageBucketKey];

export type BucketJSON = string;

export type RawBucket = [BucketKey, BucketJSON];

export type RawBuckets = RawBucket[];

export type BucketValue<TValue = unknown> = TValue;

export type BucketValues<TValue = unknown> = BucketValue<TValue>[];

export type Bucket<TValue = unknown> = [BucketKey, BucketValue<TValue>];

export type Buckets<TValue = unknown> = Bucket<TValue>[];

interface BaseStorage {
  [key: string]: unknown;
}

export type Storage<T extends BaseStorage = any> = {
  [K in keyof T]: T[K];
};

export type StorageKey<TStorage> = Extract<keyof TStorage, string>;
