import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios/axios";

export type Tasks = {
  _id?: string;
  taskName: string;
  taskDescription: string;
};

const fetchTasks = async () => {
  const res = await axiosInstance.get<Tasks[]>("/tasks");
  const data = res?.data;

  return data;
};

const useGetTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchTasks(),
  });
};

export { useGetTasks };
