import { APIError } from '@/lib/AsyncStorage/types/error';

export const handleError = (e: unknown): string => {
  let message: string = '';

  if (e instanceof APIError) {
    const { name, message: msg, statusCode, cause } = e;

    message = `[${statusCode} -- ${name}]: ${msg}`;
    if (cause) {
      message += `\n${cause}`;
    }

    return message;
  }

  if (e instanceof Error) {
    const { name, message: msg, stack } = e;
    message = `[${name}]: ${msg}`;

    if (stack) {
      message += `\n${stack}`;
    }

    return message;
  }

  if (typeof e === 'string') {
    message = e;
    return message;
  }

  message =
    'An unknown error occurred. Please contact the developer to submit a bug report.';
  return message;
};
