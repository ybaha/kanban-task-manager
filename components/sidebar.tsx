import { useDataStore } from "@store/data";
import React, { useState } from "react";
import Nav from "./nav";

type SidebarProps = {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ showSidebar, setShowSidebar }: SidebarProps) => {
  const { boards, currentBoard, setCurrentBoard } = useDataStore();
  return (
    <div className="flex desktop">
      <div
        className={`bg-gray-600 z-20 dark:bg-dark-gray h-[calc(100vh-64px)] sm:h-[calc(100vh-80px)] lg:h-[calc(100vh-96px)] w-[280px] py-8 flex flex-col justify-between transition duration-300 ${
          showSidebar ? "" : "-translate-x-full"
        }`}
      >
        <button onClick={() => setShowSidebar(!showSidebar)}>close</button>
        <Nav />
      </div>
      <div className="desktop desktop z-10 w-8 h-full fixed  flex justify-center items-center">
        <div onClick={() => setShowSidebar(!showSidebar)}> expand</div>
      </div>
    </div>
  );
};

export default Sidebar;
