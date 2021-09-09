import { request } from "shared/utils";
import { Headers } from "shared/types";

export type Response<T> = {
  status: "success" | "error" | "faild";
  data?: T;
  message?: string;
  error?: string;
};

export const baseUrl = `https://jsonplaceholder.typicode.com`;
export const headers: Headers = {
  "Content-Type": "application/json",
  Accept: "/",
  "Cache-Control": "no-cache",
};

export const apiInstance = {
  get: (url: string) => request.send(baseUrl + url),
  post: (url: string, body?: any) =>
    request.send(baseUrl + url, {
      method: "POST",
      headers,
      body: body && JSON.stringify(body),
    }),
};
