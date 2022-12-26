import { Board, Column, SubTask, Task } from "@customTypes/data";
import { useDataStore } from "@store/data";
import { useOnClickOutside } from "@utils/useOnClickOutside";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

type Props = {} & Board;

const TaskCreateModal = ({ id, title, columns }: Props) => {
  const { boards, setBoards } = useDataStore();
  const [subtaskInput, setSubtaskInput] = useState<string>("");
  const [subtasks, setSubtasks] = useState<SubTask[]>([]);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [taskColumn, setTaskColumn] = useState<Column | undefined>(
    columns[0] || undefined
  );

  const addSubtask = () => {
    if (subtaskInput) {
      console.log(subtaskInput);

      const id = subtasks.length;
      setSubtasks([
        ...subtasks,
        { title: subtaskInput, id, iscompleted: false },
      ]);
      setSubtaskInput("");
    }
  };

  const removeSubtask = (id: number) => {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== id));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!taskTitle || !taskColumn) return;

    // get the highest task id in the columns
    let highestTaskId = 0;
    columns.forEach((column) => {
      column.tasks.forEach((task) => {
        if (task.id > highestTaskId) {
          highestTaskId = task.id;
        }
      });
    });

    const newTask: Task = {
      id: highestTaskId + 1,
      title: taskTitle,
      description: taskDescription,
      subtasks,
    };

    const newColumns = columns.map((column) => {
      if (column.title === taskColumn.title) {
        return {
          ...column,
          tasks: [...column.tasks, newTask],
        };
      }
      return column;
    });

    const newBoards = boards.map((board) => {
      if (board.id === id) {
        return {
          ...board,
          columns: newColumns,
        };
      }
      return board;
    });

    setBoards(newBoards);
  };

  useEffect(() => {
    console.log(subtasks);
  }, [subtasks]);

  return (
    <form onSubmit={handleSubmit}>
      <h4 className="font-semibold">Add new Task</h4>
      <div className="flex flex-col gap-1 my-4">
        <label htmlFor="task-title" className="text-sm">
          Title
        </label>
        <input
          required={true}
          type="text"
          name="task-title"
          id="task-title"
          className="bg-gray-600 rounded-lg border border-gray-700 p-2 text-sm"
          onChange={(e) => setTaskTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1 my-4">
        <label htmlFor="description" className="text-sm">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          className="bg-gray-600 rounded-lg border border-gray-700 p-2 text-sm resize-none h-20"
          placeholder="e.g Study for exam tomorrow"
          onChange={(e) => setTaskDescription(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1 my-4">
        <label htmlFor="subtask-title" className="text-sm">
          Subtask
        </label>
        <div className="flex flex-col">
          {subtasks.map((subtask, idx) => (
            <div key={idx} className="flex w-full mt-2">
              <input
                type="text"
                name="subtask-title"
                id="subtask-title"
                className="bg-gray-600 rounded-lg border border-gray-700 p-2 text-sm flex-1 w-full"
                defaultValue={subtask.title}
                onChange={(e) => {
                  const newSubtasks = [...subtasks];
                  newSubtasks[idx].title = e.target.value;
                  setSubtasks(newSubtasks);
                }}
              />
              <div onClick={() => removeSubtask(subtask.id)}>close</div>
            </div>
          ))}
          <div className="flex w-full mt-2">
            <input
              type="text"
              name="subtask-title"
              id="subtask-title"
              className="bg-gray-600 rounded-lg border border-gray-700 p-2 text-sm flex-1 w-full"
              placeholder="e.g Set a timer"
              onChange={(e) => setSubtaskInput(e.target.value)}
            />
            {/* <div>close</div> */}
          </div>
        </div>
        <button
          className="bg-white rounded-full text-gray-800 py-2 text-sm font-semibold mt-2"
          type="button"
          onClick={() => addSubtask()}
        >
          + Add new subtask
        </button>

        <div className="flex flex-col gap-1 my-4">
          <label htmlFor="column-title" className="text-sm">
            Status
          </label>
          <select
            className="bg-gray-600 border border-gray-700 p-2 text-sm rounded-lg text-white"
            name="column-title"
            onChange={(e) => {
              setTaskColumn(
                columns.find(
                  (column) =>
                    column.title ===
                    e.currentTarget.options[e.currentTarget.selectedIndex].text
                ) as Column
              );
            }}
          >
            {columns.map((column, idx) => (
              <option key={column.id} value={column.id} selected={idx === 0}>
                {column.title}
              </option>
            ))}
          </select>
        </div>

        <button
          className="bg-white rounded-full text-gray-800 py-2 text-sm font-semibold mt-4"
          type="submit"
        >
          Create Task
        </button>
      </div>
    </form>
  );
};

export default TaskCreateModal;
