import { ErrorBase } from '@/types';
import { API_RESPONSE } from '@/lib/AsyncStorage/types/constants';

type Response = typeof API_RESPONSE;

export type ResponseType = keyof Response;

export type StatusCode = Response[ResponseType];

export class APIError extends ErrorBase<ResponseType> {
  statusCode: StatusCode;

  constructor({
    name,
    message,
    statusCode,
    cause,
  }: {
    name: ResponseType;
    message: string;
    statusCode: StatusCode;
    cause?: any;
  }) {
    super({ name, message, cause });
    this.statusCode = statusCode;
  }
}
