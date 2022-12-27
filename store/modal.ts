import { Task } from "@customTypes/data";
import zustand from "zustand";

type ModalTypes = "task-create" | "task-view" | "board" | undefined;

type ModalStore = {
  modal: ModalTypes;
  setModal: (modal: ModalTypes) => void;
  modalTaskData?: Task & { columnId: string };
  setModalTaskData: (task: Task & { columnId: string }) => void;
};

export const useModalStore = zustand<ModalStore>((set) => ({
  modal: undefined,
  setModal: (modal) => set({ modal }),
  modalTaskData: undefined,
  setModalTaskData: (task) => set({ modalTaskData: task }),
}));
