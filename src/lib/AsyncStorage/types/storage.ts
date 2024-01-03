interface BaseStorage {
  [key: string]: unknown;
}

export type Storage<T extends BaseStorage = any> = {
  [K in keyof T]: T[K];
};

export type StorageKey<TStorage> = Extract<keyof TStorage, string>;
