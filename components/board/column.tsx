import Task from "@components/task";
import { Task as TaskType } from "@customTypes/data";
import { useModalStore } from "@store/modal";
import React from "react";
import { Droppable } from "react-beautiful-dnd";

type BoardColumnProps = {
  index?: number;
  tasks?: TaskType[];
  title?: string;
  id?: number;
  newColumn?: boolean;
};

const BoardColumn = ({ tasks, title, id, newColumn }: BoardColumnProps) => {
  const { setModal } = useModalStore();
  if (newColumn)
    return (
      <Droppable droppableId="-1">
        {(provided) => (
          <div
            onClick={() => setModal("board")}
            className="h-full min-h-[500px] min-w-[280px] w-[280px] mt-9 overflow-x-visible bg-[#22232E] flex justify-center items-center cursor-pointer rounded-lg"
            ref={provided.innerRef}
          >
            <span className="text-gray-400 text-lg font-semibold">
              + New Column
            </span>
          </div>
        )}
      </Droppable>
    );
  return (
    <div className="h-full min-h-[200px] min-w-[280px] w-[280px] overflow-x-visible">
      {title && (
        <div className="flex items-center mb-4">
          <div className="w-4 h-4 rounded-full bg-red-600"></div>
          <span className="text-sm tracking-widest uppercase ml-2">
            {title + " (" + tasks?.length + ")"}
          </span>
        </div>
      )}
      <Droppable droppableId={id?.toString() || "empty"}>
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
