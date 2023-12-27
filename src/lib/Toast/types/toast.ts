import { POSITIONS } from './constants';

type Positions = typeof POSITIONS;

export type PositionsType = keyof Positions;

export type ToastOptions = {
  position?: PositionsType;
};

export type ToastProps = {
  message: string;
  options?: ToastOptions;
};
