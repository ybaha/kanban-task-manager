import { Task as TaskType } from "@customTypes/data";
import { Draggable } from "react-beautiful-dnd";
import React from "react";

type TaskProps = { index: number } & TaskType;

const Task = ({ title, index, subtasks, id }: TaskProps) => {
  const subtasksLength = subtasks?.length;
  const subtasksCompleted = subtasks?.filter(
    (subtask) => subtask.iscompleted
  )?.length;

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => (
        <div
          className="rounded-lg bg-sky-900 p-3 cursor-pointer"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <h5 className="font-semibold">{title}</h5>
          <p className="text-sm text-gray-400">
            {subtasksCompleted + " of " + subtasksLength + " subtasks"}
          </p>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
