import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axios/axios";
import { Tasks } from "./use-get-tasks";

const handleUpdate = async ({ taskName, taskDescription }: Tasks) => {
  const res = await axiosInstance.post<Tasks>("/tasks", {
    taskName,
    taskDescription,
  });
  console.log(res);

  return res.data;
};

const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Tasks) => handleUpdate(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
};

export default useUpdateTask;
