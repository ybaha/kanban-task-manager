import { useDataStore } from "@store/data";
import React, { useState } from "react";

type SidebarProps = {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ showSidebar, setShowSidebar }: SidebarProps) => {
  const { boards, currentBoard, setCurrentBoard } = useDataStore();
  return (
    <div className="flex ">
      <div
        className={`bg-gray-600 z-20 dark:bg-dark-gray h-[calc(100vh-64px)] sm:h-[calc(100vh-80px)] lg:h-[calc(100vh-96px)] w-[280px] py-8 flex flex-col justify-between transition duration-300 ${
          showSidebar ? "" : "-translate-x-full"
        }`}
      >
        <button onClick={() => setShowSidebar(!showSidebar)}>close</button>
        <div className="w-full h-full flex items-center flex-col">
          {boards.map((board) => (
            <div
              key={board.id}
              className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer ${
                currentBoard?.id === board.id ? "bg-gray-700" : ""
              }`}
              onClick={() => setCurrentBoard(board)}
            >
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gray-400 mr-2"></div>
                <div>{board.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="desktop desktop z-10 w-8 h-full fixed  flex justify-center items-center">
        <div onClick={() => setShowSidebar(!showSidebar)}> expand</div>
      </div>
    </div>
  );
};

export default Sidebar;
