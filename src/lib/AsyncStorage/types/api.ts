export type APIOptions = {
  verbose?: boolean;
};

export type APIResponseBase<TData = unknown> = {
  success: boolean;
  data: TData | null;
  error: string | null;
};

export type APIResponseVerbose<TData = unknown> = APIResponseBase<TData> & {};

export type APIResponse<TData = unknown> =
  | APIResponseBase<TData>
  | APIResponseVerbose<TData>;
