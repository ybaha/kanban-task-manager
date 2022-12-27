import { useDataStore } from "@store/data";
import React, { useState } from "react";
import Nav from "./nav";
import { useTheme } from "next-themes";
import Switch from "./switch";
import Image from "next/image";

type SidebarProps = {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ showSidebar, setShowSidebar }: SidebarProps) => {
  const { boards, currentBoard, setCurrentBoard } = useDataStore();
  const { theme, setTheme } = useTheme();
  return (
    <div className={`flex desktop transition duration-300`}>
      <div
        className={`bg-[#2B2C37] z-20 dark:bg-dark-gray h-[calc(100vh-64px)] sm:h-[calc(100vh-80px)] lg:h-[calc(100vh-96px)] w-[280px] pt-8 flex flex-col justify-between transition duration-300 ${
          showSidebar ? "" : "-translate-x-full"
        }`}
      >
        <Nav />

        <div
          className="flex items-center group hover:bg-white font-semibold px-2 py-3 pl-6 w-full rounded-r-full cursor-pointer"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <Image
            src="/assets/icon-hide-sidebar.svg"
            width={18}
            height={18}
            alt="hide sidebar"
            className="object-contain mr-3"
          ></Image>
          <span className="text-gray-400 group-hover:text-[#575FC6] ">
            Hide Sidebar
          </span>
        </div>
      </div>
      <div className="desktop desktop z-10 w-8 h-full fixed  flex justify-center items-center">
        <div onClick={() => setShowSidebar(!showSidebar)}> expand</div>
      </div>
    </div>
  );
};

export default Sidebar;
