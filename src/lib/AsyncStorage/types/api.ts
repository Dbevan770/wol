import type { StatusCode } from '@/lib/AsyncStorage/types';

export type APIOptions = {
  verbose?: boolean;
};

export type APIResponseBase<TData = unknown> = {
  success: boolean;
  data: TData | null;
  error: {
    message: string;
    code: StatusCode;
  } | null;
};

export type APIResponseVerbose<TData = unknown> = APIResponseBase<TData> & {};

export type APIResponse<TData = unknown> =
  | APIResponseBase<TData>
  | APIResponseVerbose<TData>;
