import React, { useState } from "react";

type SidebarProps = {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ showSidebar, setShowSidebar }: SidebarProps) => {
  return (
    <div className="flex ">
      <div
        className={`desktop z-10 bg-gray-600 dark:bg-dark-gray h-[calc(100vh-64px)] sm:h-[calc(100vh-80px)] lg:h-[calc(100vh-96px)] w-[280px] py-8 flex flex-col justify-between transition duration-300 ${
          showSidebar ? "" : "-translate-x-full"
        }`}
      >
        <button onClick={() => setShowSidebar(!showSidebar)}>close</button>
      </div>
      <div className="desktop w-8 h-full fixed bg-red-200 flex justify-center items-center">
        <div onClick={() => setShowSidebar(!showSidebar)}> expand</div>
      </div>
    </div>
  );
};

export default Sidebar;
