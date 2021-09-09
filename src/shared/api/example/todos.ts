import { apiInstance } from "./_base";
import type { Task } from "./models";

const BASE_URL = "/todos";

export const getTasksList = (): Promise<Task[]> => {
  return apiInstance.get(BASE_URL);
};

export type GetTodoByIdParams = {
  taskId: number;
};

export const getTaskById = ({
  taskId,
  ...params
}: GetTodoByIdParams): Promise<Task> => {
  return apiInstance.post(`${BASE_URL}/${taskId}`, { params });
};
