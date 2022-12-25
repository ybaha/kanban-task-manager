import { Task } from "@customTypes/data";
import React from "react";

type BoardColumnProps = {
  index?: number;
  tasks?: Task[];
  title?: string;
  id?: number;
};

const BoardColumn = ({ index, tasks, title, id }: BoardColumnProps) => {
  return <div>{title}</div>;
};

export default BoardColumn;
