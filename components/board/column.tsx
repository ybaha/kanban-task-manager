import Task from "@components/task";
import { Task as TaskType } from "@customTypes/data";
import React from "react";
import { Droppable } from "react-beautiful-dnd";

type BoardColumnProps = {
  index?: number;
  tasks?: TaskType[];
  title?: string;
  id?: number;
};

const BoardColumn = ({ tasks, title }: BoardColumnProps) => {
  return (
    <div className="h-full min-h-[200px] min-w-[280px] w-[280px] overflow-x-visible">
      {title && (
        <div className="flex items-center mb-4">
          <div className="w-4 h-4 rounded-full bg-red-600"></div>
          <span className="text-sm tracking-widest uppercase ml-2">
            {title}
          </span>
        </div>
      )}
      <Droppable droppableId={title || "empty"}>
        {(provided) => (
          <ul
            className="flex flex-col gap-4 min-h-[300px]"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks?.map((task, index) => (
              <li key={task.id}>
                <Task {...task} index={index}></Task>
              </li>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

export default BoardColumn;
