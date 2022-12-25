import { useDataStore } from "@store/data";
import { demoData } from "@utils/demo-data";
import { useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import BoardColumn from "./column";

const Board = () => {
  const { boards, setBoards, currentBoard, setCurrentBoard } = useDataStore();

  useEffect(() => {
    // Set default boardTab on load
    if (boards.length > 0 && !currentBoard) {
      setCurrentBoard(boards[0]);
    }
    // fetch from local storage
    else if (currentBoard) {
      setCurrentBoard(currentBoard);
    } else {
      setBoards(demoData.boards);
    }
  }, [boards, currentBoard]);

  // if (boards.length === 0) {
  //   return <div>Loading</div>;
  // }
  console.log(boards);

  // Find the selected board index
  const selectedBoardIndex = boards.findIndex(
    (board) => board.title === currentBoard?.title
  );

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // dispatch(
    //   dragEndTask({
    //     currentBoardIndex: selectedBoardIndex,
    //     destination,
    //     source,
    //   })
    // );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-6">
        {boards[selectedBoardIndex]?.columns.map((column, index) => (
          <BoardColumn
            index={index}
            tasks={column.tasks}
            title={column.title}
            key={column.id}
            id={column.id}
          />
        ))}
        {boards[selectedBoardIndex]?.columns.length > 0 ? (
          <BoardColumn title="" />
        ) : (
          <></>
        )}
      </div>
    </DragDropContext>
  );
};

export default Board;
