import Sidebar from "@components/sidebar";
import Header from "@components/header";
import Board from "@components/board/board";
import React, { useState } from "react";
import { useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const Index = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [_, render] = useState(0);

  useEffect(() => {}, []);

  return (
    <div className="w-full h-screen">
      <Header></Header>
      <div className="flex items-center">
        <Sidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        ></Sidebar>
        <main
          className={`w-full transition duration-300 p-6 ${
            !showSidebar ? "-translate-x-[280px]" : ""
          }`}
        >
          {<Board></Board>}
        </main>
      </div>
    </div>
  );
};

// const A = () => {
//   return <div>Ag</div>;
// };

// const B = () => {
//   return <div className="w-4 h-4">Bg</div>;
// };

export default Index;
