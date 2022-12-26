import { Board, Column, SubTask, Task } from "@customTypes/data";
import { useDataStore } from "@store/data";
import { useModalStore } from "@store/modal";
import { useOnClickOutside } from "@utils/useOnClickOutside";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

type Props = {} & Board;

const TaskCreateModal = (board: Props) => {
  const { boards, setBoards, currentBoard } = useDataStore();
  const { setModal } = useModalStore();
  const { modalTaskData } = useModalStore();
  const completedSubtasks = modalTaskData?.subtasks.filter(
    (subtask) => subtask.iscompleted
  ).length;

  const handleTaskRemove = () => {
    const newBoards = boards.map((board) => {
      if (board.id === currentBoard?.id) {
        return {
          ...board,
          columns: board.columns.map((column) => {
            return {
              ...column,
              tasks: column.tasks.filter(
                (task) => task.id !== modalTaskData?.id
              ),
            };
          }),
        };
      }
      return board;
    });
    setBoards(newBoards);
    setModal(undefined);
  };

  const handleColumnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sourceColumn = currentBoard?.columns.find((column) =>
      column.tasks.some((task) => task.id === modalTaskData?.id)
    );
    const destinationColumn = currentBoard?.columns.find(
      (column) =>
        column.title ===
        e.currentTarget.options[e.currentTarget.selectedIndex].text
    );

    const newBoards = boards.map((board) => {
      if (board.id === currentBoard?.id) {
        return {
          ...board,
          columns: board.columns.map((column) => {
            if (column.id === sourceColumn?.id) {
              return {
                ...column,
                tasks: column.tasks.filter(
                  (task) => task.id !== modalTaskData?.id
                ),
              };
            }
            if (column.id === destinationColumn?.id) {
              return {
                ...column,
                tasks: [...column.tasks, modalTaskData!],
              };
            }
            return column;
          }),
        };
      }
      return board;
    });

    setBoards(newBoards);
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    subtask: SubTask
  ) => {
    const newSubtasks = modalTaskData?.subtasks.map((subtask) => {
      if (subtask.id === subtask.id) {
        return { ...subtask, iscompleted: e.target.checked };
      }
      return subtask;
    });

    const newBoards = boards.map((board) => {
      if (board.id === currentBoard?.id) {
        return {
          ...board,
          columns: board.columns.map((column) => {
            if (column.tasks.some((task) => task.id === modalTaskData?.id)) {
              return {
                ...column,
                tasks: column.tasks.map((task) => {
                  if (task.id === modalTaskData?.id) {
                    return { ...task, subtasks: newSubtasks };
                  }
                  return task;
                }),
              };
            }
            return column;
          }),
        };
      }
      return board;
    });

    setBoards(newBoards);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="w-full flex justify-between">
        <h4 className="font-semibold text-lg">{modalTaskData?.title}</h4>
        <div onClick={() => handleTaskRemove()}>remove</div>
      </div>

      <p className="mt-4 text-sm text-gray-400">{modalTaskData?.description}</p>
      {modalTaskData?.subtasks && (
        <div className="flex flex-col gap-1 my-4">
          <label htmlFor="subtask-title" className="text-sm">
            {`Subtasks (${completedSubtasks} of ${modalTaskData?.subtasks.length})`}
          </label>
          <div className="flex flex-col max-h-[300px] overflow-y-scroll">
            {modalTaskData?.subtasks.map((subtask, idx) => (
              <div key={idx} className="flex w-full mt-2">
                <div className="flex items-center w-full">
                  <label
                    htmlFor={`cb-${idx}`}
                    className="text-sm font-medium bg-gray-700 p-2 rounded-lg outline-none focus:outline-none text-gray-900 dark:text-gray-300 flex items-center flex-1 w-full"
                  >
                    <input
                      id={`cb-${idx}`}
                      type="checkbox"
                      defaultChecked={subtask.iscompleted}
                      onChange={(e) => handleCheckboxChange(e, subtask)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="ml-4">{subtask.title}</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
          <h5 className="text-sm mt-4">Current status</h5>
          <select
            className="bg-gray-600 border border-gray-700 p-2 text-sm rounded-lg text-white"
            onChange={handleColumnChange}
          >
            {board.columns.map((column) => (
              <option
                key={column.id}
                value={column.id}
                selected={column.tasks.some(
                  (task) => task.id === modalTaskData?.id
                )}
              >
                {column.title}
              </option>
            ))}
          </select>
        </div>
      )}
    </form>
  );
};

export default TaskCreateModal;
