import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { IoTrashBin } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";

const zCreateTaskSchema = z.object({
  taskName: z.string().min(1),
  taskDescription: z.string().min(1),
});

const Tasks = () => {
  const [status, setStatus] = useState<"to do" | "completed">("to do");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      taskName: "",
      taskDescription: "",
    },
    resolver: zodResolver(zCreateTaskSchema),
  });

  const [tasks, setTasks] = useState<string[]>([]);

  useEffect(() => {
    getTasks();
  }, []);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    addNewTask(data);
    reset();
  });

  type TaskData = z.infer<typeof zCreateTaskSchema>;

  const addNewTask = async (data: TaskData) => {
    try {
      const res = await axios.post("http://localhost:3005/api/tasks", {
        taskName: data.taskName,
        taskDescription: data.taskDescription,
      });
      getTasks();
      console.log(res);
    } catch (error) {
      console.log("couldnot add task", error);
    }
  };

  const getTasks = async () => {
    try {
      const tasks = await axios.get("http://localhost:3005/api/tasks");
      setTasks(tasks.data);
      console.log(tasks);
    } catch (error) {
      console.log("error fetching tasks");
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      const response = await axios.delete(
        `http://localhost:3005/api/tasks/${taskId}` // Fix: Replace taskId dynamically
      );
      // console.log("Task deleted successfully:", response);
      // console.log(response);
      // console.log(taskId, tasks);
      // setTasks((tasks) => tasks?.filter((task) => task._id !== taskId));
      getTasks();
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] px-20 flex flex-col justify-center items-center">
      <h1 className="bg-black w-[60%] text-white text-center font-bold text-[20px] py-2 rounded-t-md">
        Task Manager
      </h1>
      <form
        onSubmit={onSubmit}
        className=" flex flex-col gap-2 px-5 py-2 border-black border-2 h-[90%] w-[60%] rounded-b-md"
      >
        <h2>Add New Task</h2>
        <div className="w-full">
          <input
            type="text"
            placeholder={"Task name"}
            {...register("taskName")}
            className="border-[0.5px] w-full border-gray-300 font-light text-[14px] px-2 py-1 rounded-sm focus:outline-none "
          />
          <span className="text-red-500 text-[12px] h-[18px] block">
            {errors.taskName?.message}
          </span>
        </div>
        <div className="w-full">
          <input
            type="text"
            placeholder="Task Description"
            className="border-[0.5px] w-full border-gray-300 font-light text-[14px] px-2 py-1 pb-10 rounded-sm focus:outline-none"
            {...register("taskDescription")}
          />
          <span className="text-red-500 text-[12px] h-[18px] block">
            {errors.taskDescription?.message}
          </span>
        </div>

        {/* <select
          name=""
          id=""
          className="border-[0.5px] border-gray-300 font-light text-[14px] px-2 py-1 rounded-sm focus:outline-none text-gray500"
          {...register}
        >
          <option value="To Do">To Do</option>
          <option value="Completed">Completed</option>
        </select> */}
        <button
          type="submit"
          className="bg-black text-white font-semibold py-1 rounded-xl"
        >
          Add Task
        </button>
        <div className="mt-5 h-[70%] overflow-y-scroll ">
          <h2 className="pb-2 absolute font-semibold text-red-500 ">
            Task List
          </h2>
          <div className=" mt-8">
            {tasks?.length > 0 ? (
              tasks?.map((task) => (
                <div
                  key={task._id}
                  className="bg-gray-300 px-2 py-1 flex justify-between items-center text-[14px] rounded-sm my-2"
                >
                  <div>
                    <p className="font-semibold">{task?.taskName}</p>
                    <span className="text-yellow-100">
                      Status: {status || "To Do"}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStatus("completed")}
                      className="bg-[#f23838] h-[30px] px-2 py-1 rounded-lg text-white text-[14px]"
                    >
                      <i>
                        <FaCheck />
                      </i>
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteTask(task._id)}
                      className="bg-[#f23838] h-[30px] px-2 py-1 rounded-lg text-white text-[14px]"
                    >
                      <i>
                        <IoTrashBin />
                      </i>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No tasks available</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Tasks;
