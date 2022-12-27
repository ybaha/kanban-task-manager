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
  const { setModal, setModalData } = useModalStore();
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
      <div className="flex relative px-4 border-l transition-all duration 300 border-gray-700 justify-between w-full items-center">
        <div className="flex items-center">
          <h1 className="font-semibold text-xl ml-4">
            {currentBoard?.title || ""}
          </h1>
          <span onClick={() => setShowSidebar(!showSidebar)} className="">
            <Image
              src="/assets/icon-chevron-down.svg"
              width={12}
              height={12}
              alt=""
              className={`ml-2 cursor-pointer transition-all duration-300 ${
                showSidebar ? "rotate-180" : ""
              }`}
            ></Image>
          </span>
        </div>
        {showSidebar && (
          <div className="mobile absolute min-w-[280px] top-[260px] sm:top-[300px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-[#2B2C37] pt-8 pb-4 rounded-lg">
            <Nav />
          </div>
        )}
        <div className="flex items-center">
          <button
            className="px-4 sm:px-5 sm:py-3 text-sm rounded-full bg-[#575FC6] font-semibold flex items-center justify-center"
            onClick={() => {
              if (currentBoard?.columns?.length) setModal("task-create");
              else {
                setModal("board");
                setModalData({
                  // boardId: currentBoard?.id,
                  modalTitle: "Edit Board",
                });
              }
            }}
          >
            <label className="desktop cursor-pointer">
              {currentBoard?.columns.length
                ? "+ Add New Task"
                : "+ Add New Column"}
            </label>
            <label className="mobile font-bold text-lg cursor-pointer">+</label>
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
                  setModalData({
                    modalTitle: "Edit Board",
                    boardId: currentBoard?.id,
                  });
                  setShowMore(false);
                }}
                ref={moreRef}
              >
                Edit Board
              </span>
              <span
                className="text-sm hover:underline cursor-pointer text-red-400"
                onClick={() => {
                  setModalData({
                    modalDescription: `Are you sure you want to delete "${currentBoard?.title}" board?. This action will remove all the columns and tasks associated with this board and cannot be undone.`,
                    modalTitle: "Delete this board",
                    boardId: currentBoard?.id,
                  });
                  setModal("confirmation");
                }}
              >
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
