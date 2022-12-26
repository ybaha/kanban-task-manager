import { useDataStore } from "@store/data";
import React from "react";

const Nav = () => {
  const { boards, currentBoard, setCurrentBoard } = useDataStore();
  return (
    <div className="w-full h-full flex items-center flex-col px-4">
      <h3 className="w-full text-sm uppercase text-gray-400">
        All boards ({boards.length})
      </h3>
      {boards.map((board) => (
        <div
          key={board.id}
          className={`flex items-center w-full justify-between px-4 py-2 rounded-lg cursor-pointer ${
            currentBoard?.id === board.id ? "bg-gray-700" : ""
          }`}
          onClick={() => setCurrentBoard(board)}
        >
          <div className="flex items-center w-full">
            <div className="w-2 h-2 rounded-full bg-gray-400 mr-2"></div>
            <div>{board.title}</div>
          </div>
        </div>
      ))}
      <div
        className={`flex items-center w-full justify-between py-2 rounded-lg cursor-pointer`}
        onClick={() => {}}
      >
        <div className="flex items-center w-full">
          <div className="bg-gray-700 p-2 w-full rounded-lg">
            Create new Board
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
