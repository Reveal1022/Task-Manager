import Task from "./Task";
import { useGetTasks } from "../api/use-get-tasks";

const TaskList = () => {
  const { data, isLoading, error, isError } = useGetTasks();

  console.log(data);

  return (
    <div>
      <h1>Task List</h1>
      {data?.map((item) => (
        <div key={item._id}>
          {" "}
          {/* Use _id as key since it's unique */}
          <Task
            taskName={item.taskName}
            taskDescription={item.taskDescription}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
