import { Board } from "@customTypes/data";

export const demoData: { boards: Board[] } = {
  boards: [
    {
      id: 1,
      title: "Board 1",
      columns: [
        {
          id: 1,
          title: "Column 1",
          color: "#f44336",
          tasks: [
            {
              id: 1,
              title: "Task 1",
              description: "Description 1",
              subtasks: [
                {
                  id: 1,
                  title: "Subtask 1",
                  iscompleted: false,
                },
                {
                  id: 2,
                  title: "Subtask 2",
                  iscompleted: false,
                },
              ],
              status: "todo",
            },
            {
              id: 2,
              title: "Task 2",
              description: "Description 2",
              subtasks: [
                {
                  id: 3,
                  title: "Subtask 3",
                  iscompleted: false,
                },
                {
                  id: 4,
                  title: "Subtask 4",
                  iscompleted: false,
                },
              ],
              status: "todo",
            },
          ],
        },
        {
          id: 2,
          title: "Column 2",
          color: "#2196f3",
          tasks: [
            {
              id: 3,
              title: "Task 3",
              description: "Description 3",
              subtasks: [
                {
                  id: 5,
                  title: "Subtask 5",
                  iscompleted: false,
                },
                {
                  id: 6,
                  title: "Subtask 6",
                  iscompleted: false,
                },
              ],
              status: "todo",
            },
            {
              id: 4,
              title: "Task 4",
              description: "Description 4",
              subtasks: [
                {
                  id: 7,
                  title: "Subtask 7",
                  iscompleted: false,
                },
                {
                  id: 8,
                  title: "Subtask 8",
                  iscompleted: false,
                },
              ],
              status: "todo",
            },
          ],
        },
        {
          id: 3,
          title: "Column 3",
          color: "#4caf50",
          tasks: [
            {
              id: 5,
              title: "Task 5",
              description: "Description 5",
              subtasks: [
                {
                  id: 9,
                  title: "Subtask 9",
                  iscompleted: false,
                },
                {
                  id: 10,
                  title: "Subtask 10",
                  iscompleted: false,
                },
              ],
              status: "todo",
            },
            {
              id: 6,
              title: "Task 6",
              description: "Description 6",
              subtasks: [
                {
                  id: 11,
                  title: "Subtask 11",
                  iscompleted: false,
                },
                {
                  id: 12,
                  title: "Subtask 12",
                  iscompleted: false,
                },
              ],
              status: "todo",
            },
          ],
        },
      ],
    },
    {
      id: 1,
      title: "Board 2",
      columns: [
        {
          id: 1,
          title: "Column 1",
          color: "#f44336",
          tasks: [
            {
              id: 1,
              title: "Task 1",
              description: "Description 1",
              subtasks: [
                {
                  id: 1,
                  title: "Subtask 1",
                  iscompleted: false,
                },
                {
                  id: 2,
                  title: "Subtask 2",
                  iscompleted: false,
                },
              ],
              status: "todo",
            },
            {
              id: 2,
              title: "Task 2",
              description: "Description 2",
              subtasks: [
                {
                  id: 3,
                  title: "Subtask 3",
                  iscompleted: false,
                },
                {
                  id: 4,
                  title: "Subtask 4",
                  iscompleted: false,
                },
              ],
              status: "todo",
            },
          ],
        },
        {
          id: 2,
          title: "Column 2",
          color: "#2196f3",
          tasks: [
            {
              id: 3,
              title: "Task 3",
              description: "Description 3",
              subtasks: [
                {
                  id: 5,
                  title: "Subtask 5",
                  iscompleted: false,
                },
                {
                  id: 6,
                  title: "Subtask 6",
                  iscompleted: false,
                },
              ],
              status: "todo",
            },
            {
              id: 4,
              title: "Task 4",
              description: "Description 4",
              subtasks: [
                {
                  id: 7,
                  title: "Subtask 7",
                  iscompleted: false,
                },
                {
                  id: 8,
                  title: "Subtask 8",
                  iscompleted: false,
                },
              ],
              status: "todo",
            },
          ],
        },
        {
          id: 3,
          title: "Column 3",
          color: "#4caf50",
          tasks: [
            {
              id: 5,
              title: "Task 5",
              description: "Description 5",
              subtasks: [
                {
                  id: 9,
                  title: "Subtask 9",
                  iscompleted: false,
                },
                {
                  id: 10,
                  title: "Subtask 10",
                  iscompleted: false,
                },
              ],
              status: "todo",
            },
            {
              id: 6,
              title: "Task 6",
              description: "Description 6",
              subtasks: [
                {
                  id: 11,
                  title: "Subtask 11",
                  iscompleted: false,
                },
                {
                  id: 12,
                  title: "Subtask 12",
                  iscompleted: false,
                },
              ],
              status: "todo",
            },
          ],
        },
      ],
    },
  ],
};
