import { FLAGS } from '@/types';

type Flag = typeof FLAGS;

type FlagKeys = keyof Flag;

export type FlagValue = boolean | string | number;

export type Flags = {
  [key in FlagKeys]: FlagValue;
};
