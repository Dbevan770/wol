import { RESPONSE_CODES } from '@/lib/AsyncStorage/types/constants';

type Status = typeof RESPONSE_CODES;

export type StatusCode = keyof Status;

export type APIDataBase = {
  data: unknown;
};

export type APIError = {
  status: StatusCode;
  msg: string;
};

export type APIOptions = {
  verbose?: boolean;
};

export type APIResponseBase<TData = unknown> = {
  success: boolean;
  data: TData | null;
  error: APIError | null;
};

export type APIResponseVerbose<TData = unknown> = APIResponseBase<TData> & {
  statusMsg: Status[StatusCode];
};

export type APIResponse<TData = unknown> =
  | APIResponseBase<TData>
  | APIResponseVerbose<TData>;
