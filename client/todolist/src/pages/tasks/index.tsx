import { Button, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import TaskModal from "../../components/tasks/Task.modal";
import axiosInstance from "../../config/axios.config";
import confirm from "antd/es/modal/confirm";

export interface Task {
  title: string;
  isCompleted: boolean;
  id: number;
}

function Tasks() {
  const [taskModalOpen, changeTaskModalOpenStatus] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [fetchingTasks, setFetchingTasks] = useState<boolean>(true);
  const [refetch, setRefetch] = useState<boolean>(false);

  const handleAddTask = async () => {
    changeTaskModalOpenStatus(!taskModalOpen);
  };

  const handleClose = () => {
    setSelectedTask(undefined);
    changeTaskModalOpenStatus(false);
  };

  const handleDeleteTask = async (taskId: number) => {
    setFetchingTasks(true);
    try {
      await axiosInstance.delete(`/tasks/${taskId}`);
    } catch (error) {}
    setRefetch(true);
    setFetchingTasks(false);
  };

  const fetchTasks = async () => {
    setFetchingTasks(true);
    setRefetch(false);
    try {
      await axiosInstance.get("/tasks/").then((response) => {
        setTasks(response.data);
      });
    } catch (error) {}

    setFetchingTasks(false);
  };

  useEffect(() => {
    if (refetch) fetchTasks();
  }, [refetch]);

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
            title: "Actions",
            render: (_, record) => {
              return (
                <div>
                  <Button
                    style={{
                      marginRight: 20,
                    }}
                    onClick={() => {
                      changeTaskModalOpenStatus(true);
                      setSelectedTask(() => record);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    type="primary"
                    color="danger"
                    onClick={() =>
                      confirm({
                        title: "Do you want to delete this task?",
                        onOk: async () => {
                          await handleDeleteTask(record.id);
                        },
                      })
                    }
                  >
                    Delete
                  </Button>
                </div>
              );
            },
          },
        ]}
      />
      {taskModalOpen && (
        <TaskModal
          key={selectedTask?.id}
          open={taskModalOpen}
          handleClose={handleClose}
          handleTaskSuccess={() => {
            setRefetch(true);
            handleClose();
          }}
          initialData={selectedTask && selectedTask}
        />
      )}
    </div>
  );
}

export default Tasks;
