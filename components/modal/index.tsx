import { useModalStore } from "@store/modal";
import React, { useEffect, useRef } from "react";
import BoardModal from "./board-modal";
import TaskCreateModal from "./task-create-modal";
import TaskViewModal from "./task-view-modal";
import ReactDOM from "react-dom";
import { Board, Task } from "@customTypes/data";
import { useOnClickOutside } from "@utils/useOnClickOutside";

type ModalProps = {
  board: Board | null;
};

const Modal = ({ board }: ModalProps) => {
  const { modal, setModal } = useModalStore();
  const [mounted, setMounted] = React.useState(false);
  const ref = useRef(null);

  const closeModal = () => {
    setModal(undefined);
  };

  useOnClickOutside(ref, closeModal);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted
    ? ReactDOM.createPortal(
        <div
          className="fixed top-0 left-0 w-full h-screen z-50 flex justify-center items-center"
          style={{
            background: "rgba(0,0,0,0.5)",
            display: modal ? "flex" : "none",
          }}
        >
          <div
            className="w-[480px] min-h-[360px] bg-[#2B2C37] rounded-lg p-6 mx-2 sm:p-8"
            ref={ref}
          >
            {modal === "task-create" && <TaskCreateModal {...board} />}
            {modal === "task-view" && <TaskViewModal {...board} />}
            {modal === "board" && <BoardModal {...board} />}
          </div>
        </div>,
        document.getElementById("modal-root") as HTMLElement
      )
    : null;
};

export default Modal;
