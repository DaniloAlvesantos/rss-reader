import type e from "express";

export interface DefaultResponse<T> {
  data: T;
  isError: boolean;
  message: string;
  status: number;
}

export type DefaultPromiseResponse<T> = Promise<
  e.Response<any, DefaultResponse<T>>
>;
