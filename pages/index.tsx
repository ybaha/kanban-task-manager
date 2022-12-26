import Sidebar from "@components/sidebar";
import Header from "@components/header";
import Board from "@components/board/board";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Modal from "@components/modal";

const Index = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [_, render] = useState(0);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("w: ", container?.current?.clientWidth);
  }, []);

  return (
    <div className="w-full h-screen">
      <Header></Header>
      <div
        className="flex items-center"
        style={{
          width: showSidebar
            ? "100%"
            : `calc(${container?.current?.clientWidth}px + 280px)`,
        }}
        ref={container}
      >
        <Sidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        ></Sidebar>
        <main
          className={`transition overflow-scroll duration-300 p-6 h-[calc(100vh-64px)] sm:h-[calc(100vh-80px)] lg:h-[calc(100vh-96px)] ${
            !showSidebar ? "-translate-x-[280px]" : "w-full"
          }`}
          style={{
            width: showSidebar
              ? "100%"
              : `calc(${container?.current?.clientWidth}px + 280px)`,
          }}
        >
          {<Board></Board>}
        </main>
        <div id="modal-root"></div>
      </div>
    </div>
  );
};

export default Index;
