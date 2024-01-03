import { FLAGS } from '@/types';

/* Flags are used for values that are set up by the app
 * but may frequently change. Generally, these values will
 * identify criteria that will trigger some sort of action
 */

type FlagKeys = (typeof FLAGS)[keyof typeof FLAGS];

type FlagTypes = {
  isFirstLaunch: boolean;
};

export type Flags = {
  [K in FlagKeys]: FlagTypes[K];
};
