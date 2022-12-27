import { useDataStore } from "@store/data";
import { useModalStore } from "@store/modal";
import Image from "next/image";
import IconBoard from "public/assets/icon-board";
import React from "react";

const Nav = () => {
  const { boards, currentBoard, setCurrentBoard } = useDataStore();
  const { setModal, setModalData } = useModalStore();
  return (
    <div className="w-full h-full flex items-center flex-col pr-8">
      <h3 className="w-full uppercase text-gray-400 px-6 mb-4 text-[13px] font-semibold tracking-widest">
        All boards ({boards.length})
      </h3>
      {boards.map((board) => (
        <div
          key={board.id}
          className={`flex items-center hover:bg-white px-2 py-3 pl-6 w-full rounded-r-full cursor-pointer group font-semibold ${
            currentBoard?.id === board.id ? "bg-[#575FC6]" : ""
          }`}
          onClick={() =>
            setCurrentBoard(boards.find((b) => b.id === board.id)!)
          }
        >
          <IconBoard
            className={`group-hover:fill-[#575FC6] ${
              currentBoard?.id === board.id ? "fill-white" : "fill-gray-400"
            }`}
          />
          <span
            className={`pl-4 text-gray-400 group-hover:text-[#575FC6] font-semibold ${
              currentBoard?.id === board.id ? "text-white" : ""
            }`}
          >
            {board.title}
          </span>
        </div>
      ))}
      <div
        className={`flex items-center w-full justify-between rounded-lg cursor-pointer`}
        onClick={() => {}}
      >
        <div
          className="flex items-center w-full group"
          onClick={() => {
            setModal("board");
            setModalData({ modalTitle: "Create Board" });
          }}
        >
          <div className="flex items-center hover:bg-white font-semibold px-2 py-3 pl-6 w-full rounded-r-full">
            <IconBoard className="fill-[#575FC6] group-hover:fill-[#575FC6]" />
            <span className="pl-4 text-[#575FC6] group-hover:text-[#575FC6]">
              + Create new Board
            </span>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Nav;
