import React from "react";

type TaskProps = {
  taskName: string;
  taskDescription: string;
};

const Task: React.FC<TaskProps> = ({ taskName, taskDescription }) => {
  return (
    <div className="bg-red-500 ">
      <h2>{taskName}</h2>
      <p>{taskDescription}</p>
    </div>
  );
};

export default Task;
