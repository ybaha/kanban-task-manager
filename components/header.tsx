import React from "react";
import { useDataStore } from "@store/data";
import { useModalStore } from "@store/modal";

const Header = () => {
  const { currentBoard } = useDataStore();
  const { setModal } = useModalStore();
  const addNewTask = () => {};

  return (
    <header className="flex justify-between items-center px-4 bg-gray-600 dark:bg-dark-gray h-16 sm:h-20 lg:h-24 w-full flex-shrink-0">
      <h1>{currentBoard?.title || ""}</h1>
      <div>
        {" "}
        <button
          className=""
          onClick={() => {
            setModal("task-create");
          }}
        >
          Add Task
        </button>
        <button onClick={() => setModal("board")}>Edit Board</button>
      </div>
    </header>
  );
};

export default Header;
