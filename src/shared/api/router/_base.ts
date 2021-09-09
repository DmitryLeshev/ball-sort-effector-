import { request } from "shared/utils";
import { Headers } from "shared/types";

export type Response<T> = {
  status?: boolean;
  data?: T;
  msg?: string;
};

const url = `http://192.168.0.1`;
const headers: Headers = {
  "Content-Type": "application/json",
  Accept: "/",
  "Cache-Control": "no-cache",
};

export const apiInstance =
  (controller: string) =>
  async <T>(data: any): Promise<Response<T>> => {
    const [method, params] = Object.entries(data)[0];
    return await request.send(url, {
      method: "POST",
      credentials: "include",
      headers,
      body: JSON.stringify({ path: `${controller}/${method}`, args: params }),
    });
  };
