import { Board } from "@customTypes/data";
import { useDataStore } from "@store/data";
import { useModalStore } from "@store/modal";
import { useOnClickOutside } from "@utils/useOnClickOutside";
import IconCross from "public/assets/icon-cross";
import React, { useEffect, useRef, useState } from "react";
import { TwitterPicker } from "react-color";

const BoardModal = () => {
  const newInputRef = useRef<HTMLInputElement>(null);
  const { setBoards, boards, currentBoard } = useDataStore();
  const { setModal } = useModalStore();
  const [tempBoards, setTempBoards] = useState<Board[] | null>(boards);
  const [showColorPicker, setShowColorPicker] = useState(-1);
  const colorPickerRef = useRef(null);
  if (tempBoards) console.log(tempBoards[currentBoard?.id!]);

  useOnClickOutside(colorPickerRef, () => setShowColorPicker(-1));
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
    if (tempBoards)
      setTempBoards(
        tempBoards.map((board) => {
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
    if (tempBoards)
      setTempBoards(
        tempBoards.map((board) => {
          if (board.id === currentBoard?.id) {
            return {
              ...board,
              columns: [
                ...board.columns,
                {
                  id: highestColumnId + 1,
                  title: "New Column",
                  tasks: [],
                  color: "#575FC6",
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
        <div className="flex flex-col gap-1 my-4">
          <h2 className="text-lg font-semibold mb-6">Edit Board</h2>
          <label htmlFor="board-title" className="text-sm">
            Board name
          </label>
          <input
            type="text"
            name="board-title"
            id="board-title"
            className="bg-[#2B2C37] rounded-lg border border-gray-700 p-2 text-sm"
            defaultValue={currentBoard?.title}
            onChange={(e) => {
              setTempBoards(
                boards.map((board) => {
                  if (board.id === currentBoard?.id) {
                    return {
                      ...board,
                      title: e.target.value,
                    };
                  }
                  return board;
                })
              );
            }}
          />
        </div>
        <label className="mt-4 text-sm font-semibold">Columns</label>
        <div>
          {currentTempBoard?.columns.map((column, idx) => (
            <div key={idx} className="flex w-full mt-2">
              <input
                autoFocus={idx === currentTempBoard?.columns.length - 1}
                type="text"
                name="subtask-title"
                id="subtask-title"
                className="bg-[#2B2C37] rounded-lg border border-gray-700 p-2 text-sm flex-1 w-full"
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
              <div className="flex justify-center items-center ml-4 cursor-pointer relative">
                <div
                  className="w-4 h-4 rounded-full "
                  style={{ backgroundColor: column.color }}
                  ref={colorPickerRef as any}
                  onClick={() =>
                    setShowColorPicker(showColorPicker === -1 ? idx : -1)
                  }
                ></div>
                {showColorPicker !== -1 && showColorPicker === idx && (
                  <div
                    className="absolute -right-[13px] top-8 z-30"
                    ref={colorPickerRef as any}
                  >
                    <TwitterPicker
                      triangle="top-right"
                      onChange={(color) =>
                        setTempBoards(
                          boards.map((board) => {
                            if (board.id === currentBoard?.id) {
                              const newColumns = [...currentTempBoard?.columns];
                              newColumns[idx].color = color.hex;
                              return {
                                ...board,
                                columns: newColumns,
                              };
                            }
                            return board;
                          })
                        )
                      }
                      styles={{
                        default: {
                          card: {
                            backgroundColor: "#2B2C37",
                            border: "1px solid #22232E",
                            width: "280px",
                          },
                          triangle: {
                            display: "none",
                          },
                          input: {
                            height: "30px",
                            backgroundColor: "#2B2C37",
                          },
                        },
                      }}
                    ></TwitterPicker>
                  </div>
                )}
              </div>
              <div
                onClick={() => removeColumn(column.id)}
                className="flex justify-center items-center ml-4 cursor-pointer"
              >
                <IconCross />
              </div>
            </div>
          ))}
        </div>
        <button
          className="bg-white rounded-full text-[#575FC6] py-2 text-sm font-semibold mt-4"
          type="button"
          onClick={() => addColumn()}
        >
          + Add new column
        </button>

        <div className="flex w-full gap-8 mt-6">
          <button
            className="bg-[#575FC6] text-white rounded-full py-2 text-sm font-semibold mt-2 flex-1"
            type="button"
            onClick={() => handleSave()}
          >
            Save Changes
          </button>
          <button
            className="bg-white rounded-full text-[#575FC6] py-2 text-sm font-semibold mt-2 flex-1"
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
