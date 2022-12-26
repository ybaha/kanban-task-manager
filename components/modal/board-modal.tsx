import { Board } from "@customTypes/data";
import { useDataStore } from "@store/data";
import { useModalStore } from "@store/modal";
import React, { useRef, useState } from "react";

const BoardModal = () => {
  const newInputRef = useRef<HTMLInputElement>(null);
  const { setBoards, boards, currentBoard } = useDataStore();
  const { setModal } = useModalStore();
  const [tempBoards, setTempBoards] = useState<Board[] | null>(boards);

  const currentTempBoard = tempBoards?.find(
    (board) => board.id === currentBoard?.id
  )!;

  const highestColumnId = currentTempBoard?.columns.reduce(
    (acc, column) => (column.id > acc ? column.id : acc),
    0
  );

  const handleSave = () => {
    if (tempBoards) setBoards(tempBoards);
    setModal(undefined);
  };

  const removeColumn = (id: number) => {
    setTempBoards(
      boards.map((board) => {
        if (board.id === currentBoard?.id) {
          return {
            ...board,
            columns: board.columns.filter((column) => column.id !== id),
          };
        }
        return board;
      })
    );
  };

  const addColumn = () => {
    setTempBoards(
      boards.map((board) => {
        if (board.id === currentBoard?.id) {
          return {
            ...board,
            columns: [
              ...board.columns,
              {
                id: highestColumnId + 1,
                title: "New Column",
                tasks: [],
                color: "#5543ca",
              },
            ],
          };
        }
        return board;
      })
    );
  };

  return (
    <div>
      <div className="flex flex-col">
        {currentTempBoard?.columns.map((column, idx) => (
          <div key={idx} className="flex w-full mt-2">
            <input
              autoFocus={idx === currentTempBoard?.columns.length - 1}
              type="text"
              name="subtask-title"
              id="subtask-title"
              className="bg-gray-600 rounded-lg border border-gray-700 p-2 text-sm flex-1 w-full"
              defaultValue={column.title}
              onChange={(e) => {
                const newColumns = [...currentTempBoard?.columns];
                newColumns[idx].title = e.target.value;
                setTempBoards(
                  boards.map((board) => {
                    if (board.id === currentBoard?.id) {
                      return {
                        ...board,
                        columns: newColumns,
                      };
                    }
                    return board;
                  })
                );
              }}
            />
            <div onClick={() => removeColumn(column.id)}>close</div>
          </div>
        ))}
        <button
          className="bg-white rounded-full text-gray-800 py-2 text-sm font-semibold mt-4"
          type="button"
          onClick={() => addColumn()}
        >
          + Add new column
        </button>

        <div className="flex w-full gap-8 mt-8">
          <button
            className="bg-white rounded-full text-gray-800 py-2 text-sm font-semibold mt-2 flex-1"
            type="button"
            onClick={() => handleSave()}
          >
            Save
          </button>
          <button
            className="bg-white rounded-full text-gray-800 py-2 text-sm font-semibold mt-2 flex-1"
            type="button"
            onClick={() => setModal(undefined)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardModal;
