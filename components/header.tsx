import React, { useRef, useState } from "react";
import { useDataStore } from "@store/data";
import { useModalStore } from "@store/modal";
import Nav from "./nav";
import Image from "next/image";
import { useOnClickOutside } from "@utils/useOnClickOutside";

type HeaderProps = {
  showSidebar: boolean;
  setShowSidebar: (b: boolean) => void;
};

const Header = ({ showSidebar, setShowSidebar }: HeaderProps) => {
  const moreRef = useRef<HTMLDivElement>(null);
  const { currentBoard } = useDataStore();
  const { setModal } = useModalStore();
  const addNewTask = () => {};
  const [showMore, setShowMore] = useState(false);

  useOnClickOutside(moreRef, () => setShowMore(false));

  return (
    <header className="flex justify-start bg-[#2B2C37] dark:bg-dark-gray h-16 sm:h-20 lg:h-24 w-full flex-shrink-0">
      <div
        className={`desktop transition-all duration-300 h-full flex ${
          showSidebar ? "w-[280px] min-w-[280px]" : "w-0"
        }`}
      >
        <Image
          src="/assets/logo-light.svg"
          width={150}
          height={100}
          alt=""
          style={{ objectFit: "contain" }}
          className="ml-4 cursor-pointer"
        />
      </div>
      <div className="flex px-4 border-b border-l transition-all duration 300 border-gray-700 justify-between w-full items-center">
        <h1>{currentBoard?.title || ""}</h1>
        <span onClick={() => setShowSidebar(!showSidebar)}> ~ </span>
        {showSidebar && (
          <div className="mobile absolute top-36 sm:top-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-[#2B2C37] p-6 rounded-lg">
            <Nav />
          </div>
        )}
        <div className="flex items-center">
          <button
            className="px-5 py-1.5 sm:py-3 text-sm rounded-full bg-[#575FC6] font-semibold"
            onClick={() => {
              setModal("task-create");
            }}
          >
            + Add New Task
          </button>
          <div
            className="flex w-8 h-full justify-center items-center cursor-pointer ml-3 -mr-3"
            onClick={() => setShowMore(!showMore)}
          >
            <Image
              src="/assets/icon-vertical-ellipsis.svg"
              width={5}
              height={8}
              alt="More options"
              className="object-contain"
            ></Image>
          </div>

          {showMore && (
            <div className="absolute w-44 h-24 bg-[#22232E] shadow-lg shadow-[#00000026] rounded-lg top-14 sm:top-[72px] lg:top-[86px] flex flex-col px-6 justify-around">
              <span
                className="text-sm hover:underline cursor-pointer text-gray-200"
                onClick={() => {
                  setModal("board");
                  setShowMore(false);
                }}
                ref={moreRef}
              >
                Edit Board
              </span>
              <span className="text-sm hover:underline cursor-pointer text-red-400">
                Delete Board
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
