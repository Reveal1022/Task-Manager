import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axios/axios";
import { Tasks } from "./use-get-tasks";

const handleDelete = async (taskId: string) => {
  const response = await axiosInstance.delete<Tasks[]>(`/tasks/${taskId}`);
  return response.data;
  console.log(response);
};

const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) => handleDelete(taskId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      }),
  });
};

export default useDeleteTask;
