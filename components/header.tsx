import React from "react";
import { useDataStore } from "@store/data";

const Header = () => {
  const { currentBoard } = useDataStore();

  return (
    <header className="flex justify-between items-center px-4 bg-gray-600 dark:bg-dark-gray h-16 sm:h-20 lg:h-24 w-full flex-shrink-0">
      <h1>{currentBoard?.title || ""}</h1>
      <button className="">Add Task</button>
    </header>
  );
};

export default Header;
