export const POSITIONS = {
  TOP_LEFT: {
    top: 0,
    left: 0,
  },
  TOP_CENTER: {
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  TOP_RIGHT: {
    top: 0,
    right: 0,
  },
  BOTTOM_LEFT: {
    bottom: 0,
    left: 0,
  },
  BOTTOM_CENTER: {
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  BOTTOM_RIGHT: {
    bottom: 0,
    right: 0,
  },
} as const;
