import { Button, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import TaskModal from "../../components/tasks/Task.modal";
import axiosInstance from "../../config/axios.config";

export interface Task {
  title: string;
  isCompleted: boolean;
  id: number;
}

function Tasks() {
  const [createTaskModalOpen, changeCreateTaskModalOpenStatus] =
    useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [fetchingTasks, setFetchingTasks] = useState<boolean>(true);

  const handleAddTask = async () => {
    changeCreateTaskModalOpenStatus(!createTaskModalOpen);
  };

  const fetchTasks = async () => {
    setFetchingTasks(true);
    try {
      await axiosInstance.get("/tasks").then((response) => {
        setTasks(response.data.data);
      });
    } catch (error) {}

    setFetchingTasks(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div
      style={{
        padding: "100px 100px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <label>Todo Tasks</label>
        <Button type="primary" onClick={handleAddTask}>
          Add Task
        </Button>
      </div>
      <Table
        dataSource={tasks}
        loading={fetchingTasks}
        columns={[
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Is Completed?",
            render: (_, record) => {
              return (
                <Tag color={record.isCompleted ? "green" : "yellow"}>
                  {record.isCompleted ? "True" : "False"}
                </Tag>
              );
            },
          },
          {
            title: "",
            render: (_, record) => {
              return (
                <Button
                  onClick={() => {
                    setSelectedTask(record);
                  }}
                >
                  Edit
                </Button>
              );
            },
          },
        ]}
      />
      {createTaskModalOpen ? (
        <TaskModal
          handleClose={() => {
            changeCreateTaskModalOpenStatus(false);
          }}
          handleTaskSuccess={() => {
            changeCreateTaskModalOpenStatus(false);
          }}
        />
      ) : (
        <></>
      )}
      {selectedTask ? (
        <TaskModal
          handleClose={() => {
            changeCreateTaskModalOpenStatus(false);
          }}
          handleTaskSuccess={() => {
            changeCreateTaskModalOpenStatus(false);
          }}
          initialData={selectedTask}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Tasks;
