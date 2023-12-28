import { RESPONSE_CODES } from '@/lib/AsyncStorage/types/constants';

import type { StatusCode, APIError } from '@/lib/AsyncStorage/types';

export const handleError = (e: unknown, errCode: StatusCode): APIError => {
  let status: StatusCode = errCode;
  let statusMsg: string = RESPONSE_CODES[status];

  let msg: string = `[${status} -- ${statusMsg}]: `;

  if (e instanceof Error) {
    msg += e.message;
  } else if (typeof e === 'string') {
    msg += e;
  } else {
    msg += 'Unknown error';
  }

  return { status, msg };
};
