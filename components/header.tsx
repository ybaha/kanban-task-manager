import React from "react";
import { useDataStore } from "@store/data";
import { useModalStore } from "@store/modal";
import Nav from "./nav";

type HeaderProps = {
  showSidebar: boolean;
  setShowSidebar: (b: boolean) => void;
};

const Header = ({ showSidebar, setShowSidebar }: HeaderProps) => {
  const { currentBoard } = useDataStore();
  const { setModal } = useModalStore();
  const addNewTask = () => {};

  return (
    <header className="flex bg-gray-600 dark:bg-dark-gray h-16 sm:h-20 lg:h-24 w-full flex-shrink-0">
      <div
        className={`desktop transition-all duration-300 h-full ${
          showSidebar ? "pl-[280px]" : "pl-0"
        }`}
      ></div>
      <div className="flex px-4 justify-between w-full items-center">
        <h1>{currentBoard?.title || ""}</h1>
        <span onClick={() => setShowSidebar(!showSidebar)}> ~ </span>
        {showSidebar && (
          <div className="mobile absolute top-36 sm:top-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-gray-600 p-6 rounded-lg">
            <Nav />
          </div>
        )}
        <div>
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
      </div>
    </header>
  );
};

export default Header;
