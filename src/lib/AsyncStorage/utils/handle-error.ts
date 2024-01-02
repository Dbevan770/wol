import { APIError, StatusCode } from '@/lib/AsyncStorage/types/error';

export const handleError = (
  e: unknown,
): { message: string; code: StatusCode } => {
  let message: string = '';

  if (e instanceof APIError) {
    const { name, message: msg, statusCode, cause } = e;

    message = `[${statusCode} -- ${name}]: ${msg}`;
    if (cause) {
      message += `\n${cause}`;
    }

    return { message, code: statusCode };
  }

  if (e instanceof Error) {
    const { name, message: msg, stack } = e;
    message = `[${name}]: ${msg}`;

    if (stack) {
      message += `\n${stack}`;
    }

    return { message, code: 500 };
  }

  if (typeof e === 'string') {
    message = e;
    return { message, code: 500 };
  }

  message =
    'An unknown error occurred. Please contact the developer to submit a bug report.';
  return { message, code: 500 };
};
