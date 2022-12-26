import { Board, Task as TaskType } from "@customTypes/data";
import { Draggable } from "react-beautiful-dnd";
import React from "react";
import { useModalStore } from "@store/modal";
import Modal from "./modal";
import { useDataStore } from "@store/data";

type TaskProps = { index: number } & TaskType;

const Task = ({ title, index, subtasks, id, description }: TaskProps) => {
  const { setModal, setModalTaskData } = useModalStore();
  const { currentBoard } = useDataStore();

  const subtasksLength = subtasks?.length;
  const subtasksCompleted = subtasks?.filter(
    (subtask) => subtask.iscompleted
  )?.length;

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => (
        <div
          onClick={() => {
            setModal("task-view");
            setModalTaskData({ description, id, subtasks, title });
          }}
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
